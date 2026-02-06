// Model Layer: Prisma client and type exports
// The schema is defined in /prisma/schema.prisma (root level - required by Prisma)

import { PrismaClient } from '@prisma/client';

// Prisma client instance (singleton)
const prisma = new PrismaClient();

export { prisma };
export { PrismaClient, Prisma } from '@prisma/client';
export type { User } from '@prisma/client';
