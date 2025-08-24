import { register as authRegister, login as authLogin, generateToken, generateRefreshToken } from '../services/authService';
import logger from '../utils/logger'; // Import logger
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
    logger.info(`User registered successfully: ${userResult.user.email}`);
    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword, token: userResult.token, refreshToken: userResult.refreshToken });
  } else {
    logger.error(`Failed to register user: ${email}`);
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
    if (user && (await bcrypt.compare(password, user.password as string))) {
    const userWithoutPassword: UserWithoutPassword = { // Use UserWithoutPassword
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    logger.info(`User logged in successfully: ${user.email}`);
    res.status(200).json({ message: 'User logged in successfully', user: userWithoutPassword, token, refreshToken });
  } else {
    logger.warn(`Failed login attempt for user: ${email}`);
    res.status(401).json({ message: 'Invalid credentials' });
  }
}););

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
    logger.info(`Admin registered successfully: ${userResult.user.email}`);
    res.status(201).json({ message: 'Admin registered successfully', user: userWithoutPassword, token: userResult.token, refreshToken: userResult.refreshToken });
  } else {
    logger.error(`Failed to register admin: ${email}`);
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
    logger.info(`Admin logged in successfully: ${user.email}`);
    res.status(200).json({ message: 'Admin logged in successfully', user: userWithoutPassword, token, refreshToken });
  } else {
    logger.warn(`Failed login attempt for admin: ${email}`);
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
    logger.info(`Client registered successfully: ${userResult.user.email}`);
    res.status(201).json({ message: 'Client registered successfully', user: userWithoutPassword, token: userResult.token, refreshToken: userResult.refreshToken });
  } else {
    logger.error(`Failed to register client: ${email}`);
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
    logger.info(`Client logged in successfully: ${user.email}`);
    res.status(200).json({ message: 'Client logged in successfully', user: userWithoutPassword, token, refreshToken });
  } else {
    logger.warn(`Failed login attempt for client: ${email}`);
    res.status(401).json({ message: 'Invalid credentials or not a client' });
  }
});

// @desc    Refresh Access Token
// @route   POST /api/auth/refresh
// @access  Public (with refresh token)
const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id: string };

    // Find user by ID
    const user = await User.findById(decoded.id).exec();

    if (!user) {
      res.status(401).json({ message: 'Invalid refresh token: User not found' });
      return;
    }

    // Check if refresh token exists in user's document
    if (!user.refreshToken || !user.refreshToken.includes(refreshToken)) {
      // If token is found but not in user's document, it might be a revoked token or token reuse attempt
      // Invalidate all refresh tokens for this user to prevent further unauthorized access
      user.refreshToken = [];
      await user.save();
      res.status(401).json({ message: 'Invalid refresh token: Token not found or reused' });
      return;
    }

    // Remove the used refresh token from the user's document
    user.refreshToken = user.refreshToken.filter(token => token !== refreshToken);

    // Generate new access token and new refresh token
    const newAccessToken = generateToken(user._id.toString(), user.role);
    const newRefreshToken = generateRefreshToken(user._id.toString());

    // Add the new refresh token to the user's document
    user.refreshToken.push(newRefreshToken);
    await user.save();

    logger.info(`Access token refreshed successfully for user: ${user.email}`);
    res.status(200).json({
      message: 'Access token refreshed successfully',
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });

  } catch (error: any) {
    logger.error(`Failed to refresh access token: ${error.message}`);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

export { registerUser, loginUser, registerAdmin, loginAdmin, registerClient, loginClient, refreshAccessToken };