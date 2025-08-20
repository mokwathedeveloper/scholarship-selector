const express = require('express');
const router = express.Router();
const rankController = require('../controllers/rankController');

// Route for ranking applicants
router.post('/', rankController.rankApplicants);

module.exports = router;