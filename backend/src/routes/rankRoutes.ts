import express from 'express';
import { rankApplicants, getRankedApplicants } from '../controllers/rankController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Route for ranking applicants
router.post('/', protect, rankApplicants);

// Route for getting ranked applicants (GET)
router.get('/', getRankedApplicants);

export default router;