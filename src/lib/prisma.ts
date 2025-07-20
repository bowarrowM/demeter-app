import { PrismaClient } from '@prisma/client';

// prevent constant re-creation of DB connections upon page reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
// use prismaclient if it already exists, create if it doesnt
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
