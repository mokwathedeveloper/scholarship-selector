import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import User from '../models/User';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
});

export { getAllUsers };