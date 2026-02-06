// User Model Types
// These types extend or customize the base Prisma User model

import type { User as PrismaUser } from '@prisma/client';

// Base User type from Prisma
export type User = PrismaUser;

// User without sensitive fields (for API responses)
export type SafeUser = Omit<User, 'password' | 'refreshToken' | 'resetToken' | 'resetTokenExpiry'>;

// User for authentication responses
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  organization?: string;
  role: string;
  avatar?: string;
}

// User creation input
export interface CreateUserInput {
  name: string;
  email: string;
  password: string | null;
  organization?: string | null;
  role?: string;
  googleId?: string | null;
  avatar?: string | null;
}

// User update input
export interface UpdateUserInput {
  refreshToken?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  password?: string;
  googleId?: string | null;
  avatar?: string | null;
}
