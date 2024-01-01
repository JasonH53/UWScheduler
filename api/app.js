const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
var cors = require('cors');

const { List, Task } = require('./db/models');

app.use(bodyParser.json());
app.use(cors());
/*
* GET /lists
* Purpose: Return all lists
*/ 
app.get('/lists', (req, res) => {
    // return array of lists
    List.find({}).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
});

/*
* POST /lists
* Purpose: Create List
*/ 
app.post('/lists', (req, res) => {
    try {
        let newList = new List({
            title: req.body.title
        });
        newList.save().then((listDoc) => {
            res.send(listDoc);
            console.log(listDoc);
        })
    } catch (error) {
        console.log(error);
    }
});

/*
* PATH /lists/:id
* Purpose: UPDATE LIST
*/ 
app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({message:'Updated'});
    });
});
/*
* DELETE /lists/:id
* Purpose: Delete specified list
*/ 
app.delete('/lists/:id', (req, res) => {
    List.findOneAndDelete({ _id: req.params.id}).then((removedListDoc) => {
        res.send(req.params.id + ' deleted successfully');
    })
});

/*
* GET /lists/:listId/tasks
* Purpose: retrieve array of tasks
*/
app.get('/lists/:listId/tasks', (req,res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});

/*
* POST /lists/:listId/tasks
* Purpose: add content as a task
*/
app.post('/lists/:listId/tasks', (req,res) => {
    try {
        let newTask = new Task({
            title: req.body.title,
            _listId: req.params.listId
        });
        newTask.save().then((newTaskDoc) => {
            res.send(newTaskDoc);
        })
    } catch (e) {
        res.send(e);
    }
});

/*
* PATCH /lists/:listId/tasks/:taskId
* Purpose: Update contents of taskId
*/
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {       
        res.send({message:'Updated'});
    })
});

/*
* DELETE /lists/:listId/tasks/:taskId
* Purpose: Delete task taskId
*/
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then(() => {       
        res.send(req.params.taskId + ' deleted successfully');
    })
});

/*
* GET /lists/:listId/tasks/:taskId
* Purpose: Returns contents of given task
*/
app.get('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
})

app.listen(3000, () => {
    console.log('server is listening on port 3000');
})