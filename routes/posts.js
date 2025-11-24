// server/routes/posts.js
const express = require('express');
const { 
  getPosts, 
  createPost, 
  updatePost, 
  deletePost 
} = require('../controllers/postController'); // Controller functions we will write next!

const { protect } = require('../middleware/authMiddleware'); // Import our protection middleware

const router = express.Router();

// The /api/posts route
router.route('/')
  .get(getPosts)     // Public: Anyone can view posts
  .post(protect, createPost); // Private: ONLY logged-in users can create posts (protect middleware runs first)

// The /api/posts/:id route (for individual posts)
router.route('/:id')
  .put(protect, updatePost)   // Private: ONLY logged-in user (and author) can update
  .delete(protect, deletePost); // Private: ONLY logged-in user (and author) can delete

module.exports = router;