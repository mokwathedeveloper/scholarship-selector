const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

const { protect } = require('../middleware/authMiddleware');

// Route for uploading applicant data
router.post('/', uploadController.uploadApplicantData);

module.exports = router;