const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Board = mongoose.model('Board', Schema);
module.exports = Board;