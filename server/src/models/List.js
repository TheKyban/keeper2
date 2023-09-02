const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const List = mongoose.model('List', Schema);
module.exports = List;