import { execSync } from "child_process";
import fs from "fs";

export async function setup() {
  // Delete old test database if it exists
  if (fs.existsSync("./test.db")) {
    fs.unlinkSync("./test.db");
  }
  if (fs.existsSync("./test.db-journal")) {
    fs.unlinkSync("./test.db-journal");
  }
  
  // Push schema to test database with force reset
  execSync("npx prisma db push --force-reset --accept-data-loss", {
    env: { ...process.env, DATABASE_URL: "file:./test.db" },
    stdio: "inherit",
  });
}

export async function teardown() {
  // Clean up test database
  if (fs.existsSync("./test.db")) {
    fs.unlinkSync("./test.db");
  }
  if (fs.existsSync("./test.db-journal")) {
    fs.unlinkSync("./test.db-journal");
  }
}