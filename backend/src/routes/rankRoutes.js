const express = require('express');
const router = express.Router();
const rankController = require('../controllers/rankController');

const { protect } = require('../middleware/authMiddleware');

// Route for ranking applicants
router.post('/', protect, rankController.rankApplicants);

module.exports = router;