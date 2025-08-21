import { register as authRegister, login as authLogin } from '../services/authService';
import asyncHandler from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { RegisterRequestBody, LoginRequestBody, AuthResponse, UserWithoutPassword } from '../types/auth'; // Import UserWithoutPassword
import { IUser } from '../models/User'; // Keep IUser for type assertion if needed

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req: Request<{}, {}, RegisterRequestBody>, res: Response<AuthResponse>) => {
  const { name, email, password, role } = req.body;
  const userResult = await authRegister(name, email, password, role);
  if (userResult && userResult.user) {
    const userWithoutPassword: UserWithoutPassword = { // Use UserWithoutPassword
      _id: userResult.user._id,
      name: userResult.user.name,
      email: userResult.user.email,
      role: userResult.user.role,
      createdAt: userResult.user.createdAt,
      updatedAt: userResult.user.updatedAt,
    };
    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
  } else {
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req: Request<{}, {}, LoginRequestBody>, res: Response<AuthResponse>) => {
  const { email, password } = req.body;
  const { user, token } = await authLogin(email, password);
  if (user) {
    const userWithoutPassword: UserWithoutPassword = { // Use UserWithoutPassword
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.status(200).json({ message: 'User logged in successfully', user: userWithoutPassword, token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export { registerUser, loginUser };