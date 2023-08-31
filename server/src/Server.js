const App = require('./App');
const Connect_DB = require('./Db/Connect');
require('dotenv').config();


/**
 * Database connection
 */

Connect_DB();

const PORT = process.env.PORT || 7575;
App.listen(PORT, () => console.log(`SERVER RUNNING ON ${PORT}...`));