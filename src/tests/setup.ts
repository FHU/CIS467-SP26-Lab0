import { prisma } from "../lib/prisma.js";

// run before each test to delete all rows
export async function dropData() {
  // Delete in CORRECT order - child tables first, then parent tables
  await prisma.feedback.deleteMany();  // Has FK to User and ChapelSession
  await prisma.chapelSession.deleteMany();  // Has FK to Speaker
  await prisma.speaker.deleteMany();
  await prisma.user.deleteMany();
  await prisma.task.deleteMany();
}