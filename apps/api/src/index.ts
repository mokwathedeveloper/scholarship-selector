import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { AIService } from '../../../packages/ai/src';
import { IApplicant } from '../../../packages/db/src/models/applicant';
import ApplicantModel from '../../../packages/db/src/models/applicant';
import { ingestionQueue } from './queues/ingestion.queue';
import mongoose from 'mongoose';
import rankRoutes from './controllers/rank.controller'; // Import rankRoutes

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

// Initialize AI Service
const aiService = new AIService();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from API!');
});

// Ingest Applicants Endpoint
app.post('/ingest/applicants', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const newApplicant: IApplicant = new ApplicantModel({
      name: req.file.originalname,
      email: `temp-${Date.now()}@example.com`,
      resumeText: req.file.path,
    });

    const savedApplicant = await newApplicant.save();

    await ingestionQueue.add('processApplicant', {
      filePath: req.file.path,
      applicantId: savedApplicant._id.toString(),
    });

    res.status(200).json({ message: 'Applicant data received and queued for processing', applicantId: savedApplicant._id });
  } catch (error: any) {
    console.error('Error ingesting applicant data:', error);
    res.status(500).send(`Error processing file: ${error.message}`);
  }
});

// Rank Routes
app.use('/rank', rankRoutes); // Use rankRoutes

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});