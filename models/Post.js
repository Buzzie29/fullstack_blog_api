// server/models/Post.js
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // The 'user' field links this post to the author
  // It holds the ObjectID of a document from the 'User' collection
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference the 'User' model
  },
  category: {
    type: String,
    required: true,
    default: 'Uncategorized',
  },
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;