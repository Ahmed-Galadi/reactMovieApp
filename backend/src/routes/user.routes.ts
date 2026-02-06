import { Router } from 'express';
import { getCurrentUser } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

// Routes Layer: Maps HTTP endpoints to controller methods

const router = Router();

// GET /api/users/me - Get current user
router.get('/me', authenticateToken, getCurrentUser);

export default router;
