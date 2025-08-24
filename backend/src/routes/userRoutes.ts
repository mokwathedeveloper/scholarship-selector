import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/profile')
  .get(protect, authorize('user', 'admin'), getUserProfile)
  .put(protect, authorize('user', 'admin'), updateUserProfile);

export default router;