import express from 'express';
import { exportRankedApplicants } from '../controllers/export.controller';

const router = express.Router();

router.route('/:programId').post(exportRankedApplicants);

export default router;
