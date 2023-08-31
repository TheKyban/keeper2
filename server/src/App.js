const express = require('express');
const userRoutes = require('./routes/User.js');

const App = express();

/**
 * App uses
 */

App.use(express.urlencoded({ extended: true }));
App.use(express.json());

App.use('/user', userRoutes);


module.exports = App;