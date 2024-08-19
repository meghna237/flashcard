const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const conn = require('../services/db');
conn.dbConnection();

const UserSchema = new Schema({
    "username": String,
    "password": String, // Store hashed passwords
});

const usersModel = mongoose.model('users', UserSchema);

module.exports = usersModel;