import { Router } from 'express';
import {
  signup,
  login,
  refresh,
  logout,
  forgotPasswordHandler,
  resetPasswordHandler,
  googleAuth,
} from '../controllers/auth.controller';

// Routes Layer: Maps HTTP endpoints to controller methods

const router = Router();

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/refresh
router.post('/refresh', refresh);

// POST /api/auth/logout
router.post('/logout', logout);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPasswordHandler);

// POST /api/auth/reset-password
router.post('/reset-password', resetPasswordHandler);

// POST /api/auth/google
router.post('/google', googleAuth);

export default router;
