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

// @desc    Update user by ID
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role; // Allow admin to change role

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

// @desc    Delete user by ID
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne(); // Use deleteOne() for Mongoose 6+
    res.status(200).json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getAllUsers, updateUser, deleteUser };