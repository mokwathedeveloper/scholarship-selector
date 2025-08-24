import express from 'express';
import { getRankedApplicants } from '../controllers/rankController';
import { protect } from '../middleware/authMiddleware'; // Import protect middleware

const router = express.Router();

// Route for getting ranked applicants (GET)
router.get('/', protect, getRankedApplicants);

export default router;
