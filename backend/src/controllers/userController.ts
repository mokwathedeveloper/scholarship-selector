import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';

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

export { getUserProfile };