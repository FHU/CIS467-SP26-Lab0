import { beforeAll, afterAll, beforeEach } from "vitest";
import { execSync } from "child_process";
import { prisma } from "../lib/prisma.js";

/**
 * Clears all data from the database
 */
export async function dropData() {
  // Delete in correct order - children first
  await prisma.feedback.deleteMany();
  await prisma.chapelSession.deleteMany();
  await prisma.speaker.deleteMany();
  await prisma.user.deleteMany();
  await prisma.task.deleteMany();
}

/**
 * Resets the entire database (drops and recreates schema)
 */
export async function resetDatabase() {
  console.log("🔄 Resetting database...");
  execSync("npx prisma migrate reset --force", {
    env: { ...process.env, NODE_ENV: "test" },
    stdio: "inherit",
  });
  console.log("✅ Database reset complete!");
}

/**
 * Sets up the test environment for a test file
 * Call this at the top of each test file
 */
export function setupTestEnvironment() {
  // 1️⃣ Before all tests in this file - reset DB and connect
  beforeAll(async () => {
    await resetDatabase();
    // Prisma is already connected via the singleton
    console.log("📦 Test environment ready");
  });

  // 2️⃣ Before each test - clear all data
  beforeEach(async () => {
    await dropData();
  });

  // 3️⃣ After all tests in this file - disconnect and clear
  afterAll(async () => {
    await dropData();
    await prisma.$disconnect();
    console.log("🧹 Test environment cleaned up");
  });
}
