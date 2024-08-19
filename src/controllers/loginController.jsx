const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

// Login function
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username: username });
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
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// Sign-up function
const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already taken.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
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

module.exports = { login, signup };
