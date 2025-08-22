import express from 'express';
import { getAllUsers } from '../controllers/adminController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/users').get(protect, authorize('admin'), getAllUsers);

export default router;