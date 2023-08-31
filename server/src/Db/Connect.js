const mongoose = require('mongoose');

const Connect_DB = () => {
    mongoose.connect(process.env.DB_URL).then(() => console.log('Database connected...')).catch((e) => console.log("Database not connected...",e));
};

module.exports = Connect_DB;