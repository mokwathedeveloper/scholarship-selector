import express from 'express';
import { uploadApplicantData } from '../controllers/uploadController';
import multer from 'multer';
import path from 'path';
import { Request } from 'express'; // Import Request from express
import { protect } from '../middleware/authMiddleware'; // Import protect middleware

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads/' directory
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Initialize Multer upload middleware
const upload = multer({ storage: storage });

// Route for uploading applicant data
router.post('/', protect, upload.single('file'), uploadApplicantData);

export default router;

// TODO: Add validation for file types and size
// TODO: Add error handling for file upload
// TODO: Secure this endpoint to ensure only authorized users can upload data