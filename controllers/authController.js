// server/controllers/authController.js
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Library for creating JSON Web Tokens

// --- Helper Function to Generate a JWT Token ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check if the user already exists by email
    const userExists = await User.findOne({ email });

    if (userExists) {
      // 400 Bad Request error
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create the new user (the pre-save middleware handles password hashing)
    const user = await User.create({
      username,
      email,
      password,
    });

    // 3. Respond with the user data and a token
    if (user) {
      res.status(201).json({ // 201 Created success
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email });

    // 2. Check if user exists AND if the password matches the hashed password
    if (user && (await user.matchPassword(password))) {
      // 3. Successful login, respond with user data and a new token
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // 401 Unauthorized error
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  registerUser,
  loginUser
};