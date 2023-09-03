const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

const Task = mongoose.model('Task', Schema);
module.exports = Task;