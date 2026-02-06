import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, UserPayload } from '../services/auth.service';

// Middleware Layer: Cross-cutting concerns like authentication

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

// Middleware to verify JWT token
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Get token from Authorization header or cookie
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : null;
  const tokenFromCookie = req.cookies?.access_token;
  
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  const payload = verifyAccessToken(token);
  
  if (!payload) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token',
      shouldRefresh: true 
    });
  }

  req.user = payload;
  next();
}
