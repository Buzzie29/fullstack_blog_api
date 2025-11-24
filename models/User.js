// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Library for hashing passwords

// 1. Define the User Schema (what a User document should contain)
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no two users have the same username
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users have the same email
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Adds 'createdAt' and 'updatedAt' fields automatically
});

// 2. Middleware to Hash Password Before Saving (The Security Step!)
// 'pre' means this runs BEFORE the 'save' action to the database
userSchema.pre('save', async function (next) {
  // If the password field hasn't been modified, skip hashing
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt (random value to mix with the password for better security)
  const salt = await bcrypt.genSalt(10); 
  // Hash the password using the salt
  this.password = await bcrypt.hash(this.password, salt);
});

// 3. Method to Compare Entered Password with Hashed Password for Login
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compares the plaintext entered password with the hashed password stored in the DB
  return await bcrypt.compare(enteredPassword, this.password);
};

// 4. Create and Export the Mongoose Model
const User = mongoose.model('User', userSchema);

module.exports = User;