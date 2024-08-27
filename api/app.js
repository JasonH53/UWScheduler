const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { List, Task, User } = require('./db/models');
const auth = require('./middleware/auth');

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors({
    origin: 'https://uw-scheduler.vercel.app',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Public Routes:

/*
* POST /register
* Purpose: Handles user registration logic
*/
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).send({ error: 'Username and password are required' });
    }
    
    const user = new User({ username, password });
    await user.save();
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: error.message });
    }
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.username) {
        return res.status(400).send({ error: 'Username already exists' });
      }
      return res.status(400).send({ error: 'Duplicate key error' });
    }
    res.status(500).send({ error: 'Server error' });
  }
});


/*
* POST /login
* Purpose: Handles login logic
*/
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.use(auth);


// Protected Routes:

/*
* GET /lists
* Purpose: Return all lists for authenticated user
*/ 
app.get('/lists', (req, res) => {
    List.find({ owner: req.user._id }).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

/*
* POST /lists
* Purpose: Create List
*/ 
app.post('/lists', (req, res) => {
    try {
        let newList = new List({
            title: req.body.title,
            owner: req.user._id
        });
        newList.save().then((listDoc) => {
            res.send(listDoc);
        }).catch((e) => {
            res.status(400).send(e);
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

/*
* PATH /lists/:id
* Purpose: UPDATE LIST
*/ 
app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, {
        $set: req.body
    }).then(() => {
        res.send({message:'Updated'});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/*
* DELETE /lists/:id
* Purpose: Delete specified list
*/ 
app.delete('/lists/:id', (req, res) => {
    List.findOneAndDelete({ _id: req.params.id, owner: req.user._id }).then((removedListDoc) => {
        res.send(req.params.id + ' deleted successfully');
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/*
* GET /lists/:listId/tasks
* Purpose: retrieve array of tasks
*/
app.get('/lists/:listId/tasks', (req,res) => {
    Task.find({
        _listId: req.params.listId,
        owner: req.user._id
    }).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

/*
* POST /lists/:listId/tasks
* Purpose: add content as a task
*/
app.post('/lists/:listId/tasks', (req,res) => {
    try {
        let newTask = new Task({
            title: req.body.title,
            _listId: req.params.listId,
            owner: req.user._id
        });
        newTask.save().then((newTaskDoc) => {
            res.send(newTaskDoc);
        }).catch((e) => {
            res.status(400).send(e);
        });
    } catch (e) {
        res.status(500).send(e);
    }
});

/*
* PATCH /lists/:listId/tasks/:taskId
* Purpose: Update contents of taskId
*/
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId,
        owner: req.user._id
    }, {
        $set: req.body
    }).then(() => {       
        res.send({message:'Updated'});
    }).catch((e) => {
        res.status(400).send(e);
    });
});


/*
* DELETE /lists/:listId/tasks/:taskId
* Purpose: Delete task taskId
*/
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId,
        owner: req.user._id
    }).then(() => {       
        res.send(req.params.taskId + ' deleted successfully');
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/*
* GET /lists/:listId/tasks/:taskId
* Purpose: Returns contents of given task
*/
app.get('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId,
        owner: req.user._id
    }).then((task) => {
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

app.listen(3000, () => {
    console.log('server is listening on port 3000');
});

module.exports = app;