import { config } from "dotenv";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/index.js";

// Load env ONLY if not already loaded
if (!process.env.DATABASE_URL) {
  if (process.env.NODE_ENV === "test") {
    config({ path: ".env.test" });
  } else {
    config();
  }
}

const connectionString = `${process.env.DATABASE_URL}`;

// Global singleton
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    const adapter = new PrismaBetterSqlite3({ url: connectionString });
    return new PrismaClient({ adapter });
  })();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}