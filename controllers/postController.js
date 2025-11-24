// server/controllers/postController.js
const Post = require('../models/Post');
// 💡 NOW INSTALLED: Helper to handle async errors without wrapping every function in try...catch
const asyncHandler = require('express-async-handler'); 

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
// We don't need 'try...catch' because of asyncHandler!
const getPosts = asyncHandler(async (req, res) => {
  // Find all posts and sort them by creation date (newest first)
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    // Populate the 'user' field, replacing the ID with the user's username and ID
    .populate('user', 'username'); 

  res.status(200).json(posts);
});

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  
  if (!title || !content) {
    // Return status 400 Bad Request
    res.status(400);
    throw new Error('Please include a title and content for the post.');
  }

  const post = await Post.create({
    title,
    content,
    category,
    user: req.user._id, // Assign the post to the authenticated user's ID (from protect middleware)
  });
  
  res.status(201).json(post); // 201 Created
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (Author only)
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  // Check if the user trying to update is the original author
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized to update this post');
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the new, updated document
    runValidators: true,
  });

  res.status(200).json(updatedPost);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (Author only)
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Check if the user trying to delete is the original author
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized to delete this post');
  }

  await Post.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id, message: 'Post removed successfully' });
});


module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};