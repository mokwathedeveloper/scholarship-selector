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

// @desc    Register a new admin
// @route   POST /api/auth/admin/signup
// @access  Public
const registerAdmin = asyncHandler(async (req: Request<{}, {}, RegisterRequestBody>, res: Response<AuthResponse>) => {
  const { name, email, password } = req.body;
  const userResult = await authRegister(name, email, password, 'admin'); // Explicitly set role to 'admin'
  if (userResult && userResult.user) {
    const userWithoutPassword: UserWithoutPassword = {
      _id: userResult.user._id,
      name: userResult.user.name,
      email: userResult.user.email,
      role: userResult.user.role,
      createdAt: userResult.user.createdAt,
      updatedAt: userResult.user.updatedAt,
    };
    res.status(201).json({ message: 'Admin registered successfully', user: userWithoutPassword });
  } else {
    res.status(500).json({ message: 'Failed to register admin' });
  }
});

// @desc    Login an admin
// @route   POST /api/auth/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req: Request<{}, {}, LoginRequestBody>, res: Response<AuthResponse>) => {
  const { email, password } = req.body;
  const { user, token } = await authLogin(email, password);
  if (user && user.role === 'admin') { // Ensure the logged-in user is an admin
    const userWithoutPassword: UserWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.status(200).json({ message: 'Admin logged in successfully', user: userWithoutPassword, token });
  } else {
    res.status(401).json({ message: 'Invalid credentials or not an admin' });
  }
});

// @desc    Register a new client (user)
// @route   POST /api/auth/client/signup
// @access  Public
const registerClient = asyncHandler(async (req: Request<{}, {}, RegisterRequestBody>, res: Response<AuthResponse>) => {
  const { name, email, password } = req.body;
  const userResult = await authRegister(name, email, password, 'user'); // Explicitly set role to 'user'
  if (userResult && userResult.user) {
    const userWithoutPassword: UserWithoutPassword = {
      _id: userResult.user._id,
      name: userResult.user.name,
      email: userResult.user.email,
      role: userResult.user.role,
      createdAt: userResult.user.createdAt,
      updatedAt: userResult.user.updatedAt,
    };
    res.status(201).json({ message: 'Client registered successfully', user: userWithoutPassword });
  } else {
    res.status(500).json({ message: 'Failed to register client' });
  }
});

// @desc    Login a client (user)
// @route   POST /api/auth/client/login
// @access  Public
const loginClient = asyncHandler(async (req: Request<{}, {}, LoginRequestBody>, res: Response<AuthResponse>) => {
  const { email, password } = req.body;
  const { user, token } = await authLogin(email, password);
  if (user && user.role === 'user') { // Ensure the logged-in user is a regular user
    const userWithoutPassword: UserWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.status(200).json({ message: 'Client logged in successfully', user: userWithoutPassword, token });
  } else {
    res.status(401).json({ message: 'Invalid credentials or not a client' });
  }
});

export { registerUser, loginUser, registerAdmin, loginAdmin, registerClient, loginClient };