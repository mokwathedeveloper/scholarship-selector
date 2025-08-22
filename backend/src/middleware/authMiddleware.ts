import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Assuming User model is now TS and exports default

import { IUser } from '../models/User'; // Import IUser

interface JwtPayload {
  id: string;
  role: string;
}

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Use IUser
    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; // Use JwtPayload

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password').exec();

      next();
    } catch (error: unknown) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) { // Added !req.user check
      return res.status(403).json({ message: `User role ${req.user?.role} is not authorized to access this route` });
    }
    next();
  };
};

export { protect, authorize };