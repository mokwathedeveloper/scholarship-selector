import express from 'express';
import { getApplicants, getApplicant } from '../controllers/applicantController';
import { protect, authorize } from '../middleware/authMiddleware'; // Import middleware

const router = express.Router();

router.route('/').get(protect, authorize('admin'), getApplicants);
router.route('/:id').get(protect, authorize('admin'), getApplicant);

export default router;
