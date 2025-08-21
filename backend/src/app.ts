import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorMiddleware';
import cors from 'cors';
import morgan from 'morgan'; // Import morgan for logging

// Connect to database
connectDB();

const app = express();

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

app.use('/api/upload', uploadRoutes);
app.use('/api/rank', rankRoutes);
app.use('/api/auth', authRoutes);

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