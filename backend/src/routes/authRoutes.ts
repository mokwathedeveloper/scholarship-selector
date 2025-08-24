import express from 'express';
import { registerUser, loginUser, registerAdmin, loginAdmin, registerClient, loginClient } from '../controllers/authController';

const router = express.Router();

// Generic user registration and login (can be used for client if role is passed)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin specific authentication
router.post('/admin/signup', registerAdmin);
router.post('/admin/login', loginAdmin);

// Client specific authentication
router.post('/client/signup', registerClient);
router.post('/client/login', loginClient);

export default router;