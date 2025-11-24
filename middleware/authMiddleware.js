// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // We need the User model to fetch the user

// Middleware function to protect routes
const protect = async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extract the token from the header (Authorization: Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user associated with the token's ID and exclude the password
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Move to the next middleware or controller function
      next();
      
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' }); // 401: Unauthorized
    }
  }

  // If no token is found in the header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };