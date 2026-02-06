import { Request, Response } from 'express';
import { getUserById } from '../services/auth.service';

// Controller Layer: Handles HTTP requests for user operations

// GET /api/users/me - Get current user
export async function getCurrentUser(req: Request, res: Response) {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    const user = await getUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get user',
    });
  }
}
