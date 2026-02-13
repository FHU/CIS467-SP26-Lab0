import { execSync } from "node:child_process"

export async function setup() {
  const env = {
    ...process.env,
    DATABASE_URL: "file:./test.db"
  }

  console.log("Resetting test database...")

  // reset schema + migrations
  execSync("npx prisma migrate reset --force", {
    stdio: "inherit",
    env
  })

  console.log("Seeding test database...")

  // run seed script
  execSync("npx prisma db seed", {
    stdio: "inherit",
    env
  })

  console.log("Test database ready")
}
