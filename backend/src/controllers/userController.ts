import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import User from '../models/User'; // Import User model

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private (User)
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  // req.user will be available from the protect middleware
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private (User)
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized, no user found');
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getUserProfile, updateUserProfile };