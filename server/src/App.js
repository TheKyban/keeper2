const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const App = express();


/**
 * App uses
 */

App.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST','PUT',"DELETE"],
    credentials: true
}));
App.use(cookieParser());

App.use(express.urlencoded({ extended: true }));
App.use(express.json());

App.use('/user', require('./routes/User.js'));
App.use('/board', require('./routes/Board.js'));
App.use('/list', require('./routes/List.js'));
App.use('/task', require('./routes/Task.js'));


module.exports = App;


// mongosh "mongodb+srv://cluster0.y6eehy3.mongodb.net/" --apiVersion 1 --username aditya