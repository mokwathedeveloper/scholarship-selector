import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../models/User';
import { AuthServiceResponse, UserWithoutPassword } from '../types/auth';

// Generate Access Token
const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: '15m' }); // Short expiration for access token
};

// Generate Refresh Token
const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' }); // Longer expiration for refresh token
};

// Register user
const register = async (name: string, email: string, password: string, role?: string): Promise<AuthServiceResponse> => {
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
    const accessToken = generateToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    // Store refresh token in user document
    user.refreshToken = user.refreshToken ? [...user.refreshToken, refreshToken] : [refreshToken];
    await user.save();

    const userWithoutPassword: UserWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return { user: userWithoutPassword, token: accessToken, refreshToken };
  } else {
    throw new Error('Invalid user data');
  }
};

// Login user
const login = async (email: string, password: string): Promise<AuthServiceResponse> => {
  // Check for user email
  const user = await User.findOne({ email }).exec();

  if (user && (await bcrypt.compare(password, user.password as string))) {
    const accessToken = generateToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    // Store refresh token in user document
    user.refreshToken = user.refreshToken ? [...user.refreshToken, refreshToken] : [refreshToken];
    await user.save();

    const userWithoutPassword: UserWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return { user: userWithoutPassword, token: accessToken, refreshToken };
  } else {
    throw new Error('Invalid credentials');
  }
};

export { register, login };
