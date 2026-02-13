import { config } from "dotenv";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/index.js";

// Load the correct .env file based on NODE_ENV
if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config(); // loads .env by default
}

const connectionString = `${process.env.DATABASE_URL}`;

// Singleton to ensure only one database connection
let prismaInstance: PrismaClient | undefined;

function getPrismaClient() {
  if (!prismaInstance) {
    const adapter = new PrismaBetterSqlite3({ url: connectionString });
    prismaInstance = new PrismaClient({ adapter });
  }
  return prismaInstance;
}

export const prisma = getPrismaClient();