import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorMiddleware';
import cors from 'cors';

// Connect to database
connectDB();

const app = express();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Error handling middleware
app.use(errorHandler);