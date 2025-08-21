import { register as authRegister, login as authLogin } from '../services/authService';
import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const user = await authRegister(name, email, password, role);
  res.status(201).json({ message: 'User registered successfully', user });
});

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await authLogin(email, password);
  res.status(200).json({ message: 'User logged in successfully', user, token });
});

export { registerUser, loginUser };