const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager').then(() => {
    console.log("connected to mongodb");
}).catch((e) => {
    console.log("Error: " + e);
});

module.exports = {
    mongoose
};