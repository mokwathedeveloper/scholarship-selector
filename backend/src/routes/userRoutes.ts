import express from 'express';
import { getUserProfile } from '../controllers/userController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/profile').get(protect, authorize('user', 'admin'), getUserProfile);

export default router;