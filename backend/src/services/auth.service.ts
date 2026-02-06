import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import * as userRepository from '../repositories/user.repository';

// Service Layer: Contains business logic for authentication

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
const JWT_EXPIRES_IN = '15m';
const JWT_REFRESH_EXPIRES_IN = '7d';

// Types
export interface UserPayload {
  userId: string;
  email: string;
  role: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    fullName: string;
    organization?: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Compare password
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate access token
export function generateAccessToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Generate refresh token
export function generateRefreshToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}

// Verify access token
export function verifyAccessToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as UserPayload;
  } catch {
    return null;
  }
}

// Generate both tokens
export function generateTokens(user: { id: string; email: string; role: string }): TokenPair {
  const payload: UserPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

// Generate Reset Password Token
export function generateResetPasswordToken(): string {
  const token = crypto.randomBytes(32).toString('hex');
  return token;
}

// Forgot password - generate and save token
export async function forgotPassword(email: string): Promise<string | null> {
  const user = await userRepository.findByEmail(email);
  
  if (!user) {
    return null; // Don't reveal if email exists
  }

  const resetToken = generateResetPasswordToken();
  const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await userRepository.updateById(user.id, {
    resetToken,
    resetTokenExpiry,
  });

  return resetToken; // Send this in email link
}

// Reset Password 
export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  // Find user with valid reset token
  const user = await userRepository.findByResetToken(token);

  // If no user found means token is invalid or expired
  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  // Hash the new password
  const hashedPassword = await hashPassword(newPassword);

  // Update password and clear reset token
  await userRepository.updateById(user.id, {
    password: hashedPassword,
    resetToken: null,
    resetTokenExpiry: null,
  });

  return true;
}

// Register new user
export async function registerUser(data: {
  fullName: string;
  email: string;
  password: string;
  organization?: string;
}): Promise<AuthResponse> {
  // Check if user exists
  const existingUser = await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create user
  const user = await userRepository.create({
    name: data.fullName,
    email: data.email,
    password: hashedPassword,
    organization: data.organization || null,
    role: 'USER',
  });

  // Generate tokens
  const tokens = generateTokens(user);

  // Save refresh token to database
  await userRepository.updateById(user.id, {
    refreshToken: tokens.refreshToken,
  });

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.name,
      organization: user.organization || undefined,
      role: user.role,
    },
    token: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
}

// Login user
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  // Find user
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  if (!user.password) {
    throw new Error('Please use Google to sign in');
  }
  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  // Generate tokens
  const tokens = generateTokens(user);

  // Save refresh token to database
  await userRepository.updateById(user.id, {
    refreshToken: tokens.refreshToken,
  });

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.name,
      organization: user.organization || undefined,
      role: user.role,
    },
    token: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
}

// Refresh tokens
export async function refreshTokens(refreshToken: string): Promise<AuthResponse> {
  // Verify refresh token
  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    throw new Error('Invalid refresh token');
  }

  // Find user and check if refresh token matches
  const user = await userRepository.findById(payload.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new Error('Invalid refresh token');
  }

  // Generate new tokens
  const tokens = generateTokens(user);

  // Save new refresh token to database
  await userRepository.updateById(user.id, {
    refreshToken: tokens.refreshToken,
  });

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.name,
      organization: user.organization || undefined,
      role: user.role,
    },
    token: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
}

// Logout user
export async function logoutUser(userId: string): Promise<void> {
  await userRepository.updateById(userId, {
    refreshToken: null,
  });
}

// Get user by ID
export async function getUserById(userId: string) {
  const user = await userRepository.findByIdWithSelect(userId);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.name,
    organization: user.organization || undefined,
    role: user.role,
  };
}
