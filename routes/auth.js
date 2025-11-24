// server/routes/auth.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Route for user registration
// POST to /api/auth/register will run the registerUser function
router.post('/register', registerUser);

// Route for user login
// POST to /api/auth/login will run the loginUser function
router.post('/login', loginUser);

module.exports = router;