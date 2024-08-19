const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Correct import based on the provided model file
const { usersModel, questionsModel, subjectsModel } = require('../models/flashcardModel');
require('dotenv').config();

// Login function
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await usersModel.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid username or password.' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid username or password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the client
        res.json({ success: true, token: token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Sign-up function
const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await usersModel.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already taken.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new usersModel({
            username: username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the client
        res.json({ success: true, token: token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

//function to get the list of subjects
const getSubjects = async (req, res) => {
    try {
        const userId = req.params.userId;
        const subjects = await subjectsModel.find({ user: userId });
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch subjects', error });
    }
};

// Add subjects function
const addSubject = async (req, res) => {
    try {
        const { name, user } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: 'Subject name not entered' });
        }

        const newSubject = new subjectsModel({ name, user });
        await newSubject.save();

        res.status(201).json({ success: true, subject: newSubject });
    } catch (error) {
        console.error('Error adding subject:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
};

module.exports = {
    login,
    signup,
    addSubject,
    getSubjects
};
