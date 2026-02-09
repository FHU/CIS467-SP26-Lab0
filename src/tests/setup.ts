import { execSync } from 'child_process'
import { prisma } from '../lib/prisma.js'

export async function setup() {
    execSync('npx prisma db push --force-reset')
}

export async function dropData() {
    await prisma.task.deleteMany()
}

export async function tearDown() {
    await prisma.$disconnect()
}