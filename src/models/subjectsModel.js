const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const conn = require('../services/db');
conn.dbConnection();

const SubjectSchema = new Schema({
    name: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

const subjectsModel = mongoose.model('subjects', SubjectSchema);


module.export = subjectsModel