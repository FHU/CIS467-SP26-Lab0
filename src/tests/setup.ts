import { execSync } from 'child_process'
import { prisma } from "../lib/prisma.js"

// before all tests
export async function setup() {
    execSync('npx prisma db push --force-reset');
}

// before each tests: clean out data 
export async function dropData() {
    await prisma.task.deleteMany();
}

// after all tests have run: disconnect
export async function tearDown() {
    await prisma.$disconnect();
}