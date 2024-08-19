const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect('MONGODB_URL', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a User schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String, // Store hashed passwords
});

// Create a User model
const User = mongoose.model('users', UserSchema);

const QuestionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    subject: {type: mongoose.Schema.Types.ObjectId, ref: 'subjects'}
});

const Question = mongoose.model('questions', QuestionSchema);

// Define a Subject schema
const SubjectSchema = new mongoose.Schema({
    name: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

// Create a Subject model
const Subject = mongoose.model('subjects', SubjectSchema);

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username: username });
    if (!user) {
        return res.json({ success: false, message: 'Invalid username or password.' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.json({ success: false, message: 'Invalid username or password.' });
    }

    // If login is successful
    res.json({ success: true, message: 'Login successful.' });
});

// Endpoint to fetch all subjects
app.get('/api/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subjects' });
    }
});

// Endpoint to add a new subject
app.post('/api/subjects', async (req, res) => {
    const { name } = req.body;

    try {
        const newSubject = new Subject({ name });
        await newSubject.save();

        res.json({ success: true, subject: newSubject });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add subject' });
    }
});

app.get('/api/flashcards', async (req, res) => {
    try {
        const flashcards = await Question.find();
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch flashcards' });
    }
});

app.post('/api/flashcards', async (req, res) => {
    const { question, answer } = req.body;

    try {
        const newFlashcard = new Question({ question, answer });
        await newFlashcard.save();

        res.json({ success: true, flashcard: newFlashcard });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add flashcard' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
