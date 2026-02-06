import { prisma } from '../models';
import type { CreateUserInput, UpdateUserInput } from '../models/user.model';

// Repository Layer: Handles all database interactions for User entity
// Uses types from Model layer for type safety

// Find user by email
export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Find user by ID
export async function findById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

// Find user by ID with selected fields
export async function findByIdWithSelect(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      organization: true,
      role: true,
    },
  });
}

// Find user by Google ID
export async function findByGoogleId(googleId: string) {
  return prisma.user.findUnique({
    where: { googleId },
  });
}

// Find user by reset token (not expired)
export async function findByResetToken(token: string) {
  return prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });
}

// Create new user
export async function create(data: CreateUserInput) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      organization: data.organization || null,
      role: data.role || 'USER',
      googleId: data.googleId || null,
      avatar: data.avatar || null,
    },
  });
}

// Update user by ID
export async function updateById(userId: string, data: UpdateUserInput) {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}
