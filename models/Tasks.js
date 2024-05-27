const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'name is a required field'],
        maxLength: [20, 'maximum length allowed is 20']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const TaskModel = mongoose.model('Tasks',TaskSchema)

module.exports = TaskModel;