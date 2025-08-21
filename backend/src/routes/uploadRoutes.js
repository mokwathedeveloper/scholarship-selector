const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer'); // Import multer
const path = require('path'); // Import path for file extensions

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize Multer upload middleware
const upload = multer({ storage: storage });

// Route for uploading applicant data
router.post('/', upload.single('file'), uploadController.uploadApplicantData);

module.exports = router;