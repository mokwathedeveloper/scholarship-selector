import express from 'express';
import { check, validationResult } from 'express-validator'; // Import validation tools
import { registerUser, loginUser, registerAdmin, loginAdmin, registerClient, loginClient, refreshAccessToken } from '../controllers/authController';
import rateLimit from 'express-rate-limit'; // Import rateLimit

const router = express.Router();

// Rate limiting middleware
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Validation middleware
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation chains
const registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

const refreshTokenValidation = [
  check('refreshToken', 'Refresh token is required').not().isEmpty(),
];

// Generic user registration and login (can be used for client if role is passed)
router.post('/register', authLimiter, registerValidation, validate, registerUser);
router.post('/login', authLimiter, loginValidation, validate, loginUser);

// Admin specific authentication
router.post('/admin/signup', authLimiter, registerValidation, validate, registerAdmin);
router.post('/admin/login', authLimiter, loginValidation, validate, loginAdmin);

// Client specific authentication
router.post('/client/signup', authLimiter, registerValidation, validate, registerClient);
router.post('/client/login', authLimiter, loginValidation, validate, loginClient);

// Refresh Access Token
router.post('/refresh', authLimiter, refreshTokenValidation, validate, refreshAccessToken);

export default router;