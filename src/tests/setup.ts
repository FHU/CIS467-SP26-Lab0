import { execSync } from 'child_process'
import { prisma } from '../lib/prisma.js'

export async function setup() {
    execSync('npx prisma db push --force-reset')
}

export async function dropData() {
    await prisma.task.deleteMany()
    await prisma.feedback.deleteMany();
    await prisma.chapelSession.deleteMany();
    await prisma.speaker.deleteMany();
    await prisma.user.deleteMany();
}

export async function tearDown() {
    await prisma.$disconnect()
}