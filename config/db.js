const mongoose = require('mongoose');
require('dotenv').config();

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        return console.log('DB Connected.');
    } catch(error) {
        return console.log(error.message || error);
    }
}
module.exports = ConnectDB;