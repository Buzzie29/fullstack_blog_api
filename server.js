// Load environment variables from .env file
require('dotenv').config();

// Import required libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// server/server.js (Add this line near the top with other imports)
const authRoutes = require('./routes/auth');
// server/server.js (Add this line with other imports)
const postRoutes = require('./routes/posts');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware Setup ---
// Enable CORS for all requests (important for frontend to talk to backend)
app.use(cors());
// Parse JSON request bodies (to handle data sent from client)
app.use(express.json());

// --- Database Connection Function ---
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

// Connect to database
connectDB();

// server/server.js (Add this line before the test route)
// server/server.js (Add this line with other API Routes)
// --- API Routes ---
app.use('/api/auth', authRoutes); 
app.use('/api/posts', postRoutes); // 💡 NEW: Use the Post Routes


// --- Simple Test Route (API Entry Point) ---
app.get('/', (req, res) => {
  res.send('API is running...');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});