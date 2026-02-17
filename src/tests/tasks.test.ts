import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import request from 'supertest';

import { prisma } from "../lib/prisma.js"
import { setup, dropData, tearDown } from "./setup.js"
import app from "../app.js"


beforeAll(async()=> {
    await setup();
})

beforeEach(async()=> {
    await dropData();
})

afterAll(async()=> {
    await tearDown();
})

// test get all tasks
//This is the example for the others