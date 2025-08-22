import express from 'express';
import { getRankedApplicants } from '../controllers/rankController';

const router = express.Router();

// Route for getting ranked applicants (GET)
router.get('/', getRankedApplicants);

export default router;
