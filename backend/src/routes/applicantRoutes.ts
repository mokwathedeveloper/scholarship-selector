import express from 'express';
import { getApplicants, getApplicant } from '../controllers/applicantController';

const router = express.Router();

router.route('/').get(getApplicants);
router.route('/:id').get(getApplicant);

export default router;
