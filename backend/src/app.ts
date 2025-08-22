import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorMiddleware';
import cors from 'cors';
import morgan from 'morgan'; // Import morgan for logging
import fs from 'fs';
import path from 'path';

// Connect to database
connectDB();

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

// Middleware
app.use(express.json());

// Routes
import uploadRoutes from './routes/uploadRoutes';
import rankRoutes from './routes/rankRoutes';
import authRoutes from './routes/authRoutes';
import criteriaRoutes from './routes/criteria.routes';
import applicantRoutes from './routes/applicantRoutes';
import exportRoutes from './routes/export.routes';
import webhookRoutes from './routes/webhook.routes'; // New import

app.use('/api/upload', uploadRoutes);
app.use('/api/rank', rankRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/criteria', criteriaRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/webhooks', webhookRoutes); // New route

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.use(errorHandler);

// Only connect to DB if app.ts is run directly (not imported as a module)
if (require.main === module) {
  connectDB();
}

export default app;
