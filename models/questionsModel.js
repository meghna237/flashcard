const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const conn = require('../src/services/db');
conn.dbConnection();

const QuestionSchema = new Schema({
    question: String,
    answer: String,
    subject: {type: mongoose.Schema.Types.ObjectId, ref: 'subjects'}
});

const questionsModel = mongoose.model('questions', QuestionSchema);

module.exports = questionsModel;