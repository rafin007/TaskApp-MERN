const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;