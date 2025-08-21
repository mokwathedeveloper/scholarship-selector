const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register user
const register = async (name, email, password, role) => {
  // Check if user exists
  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'user',
  });

  if (user) {
    return { user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user._id) };
  } else {
    throw new Error('Invalid user data');
  }
};

// Login user
const login = async (email, password) => {
  // Check for user email
  const user = await User.findOne({ email }).exec();

  if (user && (await bcrypt.compare(password, user.password))) {
    return { user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user._id) };
  } else {
    throw new Error('Invalid credentials');
  }
};

module.exports = { register, login };