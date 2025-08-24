import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/adminController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/users')
  .get(protect, authorize('admin'), getAllUsers);

router.route('/users/:id')
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

export default router;