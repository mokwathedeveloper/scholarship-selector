import express from 'express';
import {
  createCriteria,
  getCriteria,
  getCriteriaById,
  updateCriteria,
  deleteCriteria,
  rankApplicantsByProgram,
} from '../controllers/criteria.controller';

const router = express.Router();

router.route('/').post(createCriteria).get(getCriteria);
router.route('/:id').get(getCriteriaById).put(updateCriteria).delete(deleteCriteria);
router.route('/programs/:programId/rank').post(rankApplicantsByProgram);

export default router;
