import { Request, Response } from 'express';
import { 
  registerUser, 
  loginUser, 
  refreshTokens, 
  logoutUser,
  verifyAccessToken,
  forgotPassword,
  resetPassword,
  generateTokens
} from '../services/auth.service';
import { sendResetEmail } from '../services/email.service';
import { verifyGoogleToken, findAndCreateGoogleUser } from '../services/google.service';

// Controller Layer: Handles HTTP requests, validates input, delegates to services

// POST /api/auth/signup
export async function signup(req: Request, res: Response) {
  try {
    const { fullName, email, password, organization } = req.body;

    // Input validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and password are required',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    const result = await registerUser({ fullName, email, password, organization });
    
    return res.status(201).json(result);

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return res.status(400).json({ success: false, message });
  }
}

// POST /api/auth/login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const result = await loginUser(email, password);
    
    return res.json(result);

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return res.status(401).json({ success: false, message });
  }
}

// POST /api/auth/refresh
export async function refresh(req: Request, res: Response) {
  try {
    // Get refresh token from header or cookie
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : null;
    const tokenFromCookie = req.cookies?.refresh_token;
    
    const refreshToken = tokenFromHeader || tokenFromCookie;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required',
      });
    }

    const result = await refreshTokens(refreshToken);
    
    return res.json(result);

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Token refresh failed';
    return res.status(401).json({ success: false, message });
  }
}

// POST /api/auth/logout
export async function logout(req: Request, res: Response) {
  try {
    // Try to get user from token
    const authHeader = req.headers.authorization;
    const tokenFromCookie = req.cookies?.access_token;
    const token = (authHeader && authHeader.slice(7)) || tokenFromCookie;

    if (token) {
      const payload = verifyAccessToken(token);
      if (payload?.userId) {
        await logoutUser(payload.userId);
      }
    }

    return res.json({ success: true, message: 'Logged out successfully' });

  } catch (error) {
    // Always return success for logout
    return res.json({ success: true, message: 'Logged out successfully' });
  }
}

// POST /api/auth/forgot-password
export async function forgotPasswordHandler(req: Request, res: Response) {
  try {
    const { email } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const resetToken = await forgotPassword(email);

    // Send email
    if (resetToken) {
      await sendResetEmail(email, resetToken);
    }

    return res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent',
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process forgot password request',
    });
  }
}

// POST /api/auth/reset-password
export async function resetPasswordHandler(req: Request, res: Response) {
  try {
    const { token, newPassword } = req.body;

    // Input validation
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters',
      });
    }

    // Reset the password
    await resetPassword(token, newPassword);

    return res.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.',
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to reset password';
    return res.status(400).json({ success: false, message });
  }
}

// POST /api/auth/google
export async function googleAuth(req: Request, res: Response) {
  try {
    const { token } = req.body;

    // Input validation
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Google token is not found!'
      });
    }

    // Verify token with Google
    const googleData = await verifyGoogleToken(token);
    if (!googleData) {
      return res.status(401).json({
        success: false,
        message: 'Google token is invalid'
      });
    }

    // Create or find user in database
    const user = await findAndCreateGoogleUser(googleData);

    // Generate tokens
    const tokens = generateTokens(user);

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.name,
        organization: user.organization || undefined,
        role: user.role,
        avatar: user.avatar || undefined,
      },
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });

  } catch (error) {
    console.error('Google auth error:', error);
    const message = error instanceof Error ? error.message : 'Google auth error!';
    return res.status(500).json({ success: false, message });
  }
}
