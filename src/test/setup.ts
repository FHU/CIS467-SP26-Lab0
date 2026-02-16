import { execSync } from "node:child_process";
import {prisma} from "../lib/prisma.js";

//befor all tests: reset DB
export async function setup(){
    execSync("npx prisma db push --force-reset");
}
//befoe each test: clean out the  DB
export async function dropData(){
    await prisma.feedback.deleteMany();
    await prisma.chapelSession.deleteMany();
    await prisma.speaker.deleteMany();
    await prisma.user.deleteMany();
}

//after all tests: disconnect from DB
export async function teardown(){
    await prisma.$disconnect();
}

setup();
