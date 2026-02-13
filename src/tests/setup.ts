import { execSync } from 'child_process'
import { prisma } from '../lib/prisma.js'

export async function setup() {
    execSync('npx prisma migrate reset --force')
}

export async function dropData() {
    await prisma.feedback.deleteMany()
    await prisma.chapelSession.deleteMany()
    await prisma.speaker.deleteMany()
    await prisma.user.deleteMany()
    await prisma.task.deleteMany()
}

export async function tearDown() {
    await prisma.$disconnect()
}