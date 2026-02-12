import {execSync} from 'child_process';
import { prisma } from '../lib/prisma.js'; // May have the wrong database URL

// before all tests
export async function setup() {
    execSync('npx prisma db push --force-reset', { stdio: 'inherit' });
}

// before each test: clean out the data
// may be more efficient to use transactions and truncate tables instead of deleting rows one by one
export async function dropData() {
    await prisma.user.deleteMany();
    await prisma.chapelSession.deleteMany();
    await prisma.feedback.deleteMany();
    await prisma.speaker.deleteMany();
    // npx prisma migrate reset
}

// after all tests ran
export async function tearDown() {
    await prisma.$disconnect();
}