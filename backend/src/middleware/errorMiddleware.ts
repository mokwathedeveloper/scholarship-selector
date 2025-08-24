import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError'; // Import AppError
import logger from '../utils/logger'; // Import logger

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log the error
  logger.error(err.message, { stack: err.stack, statusCode: err.statusCode, url: req.originalUrl, method: req.method, ip: req.ip });

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { errorHandler };