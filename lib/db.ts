import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function makeClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

/**
 * IMPORTANT:
 * If DATABASE_URL is not set (common in Preview builds), don't initialize Prisma
 * at module load time. This prevents Vercel/Next build from failing.
 * Checkout/admin routes will work only after you add DATABASE_URL on Vercel.
 */
export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  (process.env.DATABASE_URL ? makeClient() : (null as any));

if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma;
}
