const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Route for uploading applicant data
router.post('/', uploadController.uploadApplicantData);

module.exports = router;