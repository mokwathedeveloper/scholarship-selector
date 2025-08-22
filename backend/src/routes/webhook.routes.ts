import express from 'express';
import { handleLmsWebhook } from '../controllers/webhook.controller';

const router = express.Router();

router.route('/lms').post(handleLmsWebhook);

export default router;
