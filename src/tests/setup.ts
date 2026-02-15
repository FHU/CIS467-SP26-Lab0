import { execSync } from "child_process";
import {prisma} from "../lib/prisma.js";


//before all tests: reset DB
export async function setup() {
    await prisma.$connect();
}

// before each test: clean out the data
export async function dropData() {
    await prisma.fEEDBACK.deleteMany();
    await prisma.cHAPEL_SESSION.deleteMany();
    await prisma.sPEAKER.deleteMany();
    await prisma.uSER.deleteMany();
}

export async function tearDown() {
    await dropData();
    await prisma.$disconnect();
}