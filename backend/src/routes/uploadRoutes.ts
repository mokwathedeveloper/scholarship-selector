import express from 'express';
import { uploadApplicantData } from '../controllers/uploadController';
import multer from 'multer';
import path from 'path';
import { Request } from 'express'; // Import Request from express

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
router.post('/', upload.single('file'), uploadApplicantData);

export default router;