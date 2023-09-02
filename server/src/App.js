const express = require('express');
const userRoutes = require('./routes/User.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const App = express();

/**
 * App uses
 */

App.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));
App.use(cookieParser());

App.use(express.urlencoded({ extended: true }));
App.use(express.json());

App.use('/user', userRoutes);


module.exports = App;