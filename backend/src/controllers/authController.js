const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await authService.register(name, email, password, role);
  res.status(201).json({ message: 'User registered successfully', user });
});

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  res.status(200).json({ message: 'User logged in successfully', user, token });
});

module.exports = { registerUser, loginUser };