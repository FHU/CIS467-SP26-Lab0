import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import request from 'supertest'

import { prisma } from '../lib/prisma.js'
import { setup, dropData, tearDown } from './setup.js'
import app from '../app.js'

beforeAll(async () => {await setup()})

beforeEach(async () => {await dropData()})

afterAll(async () => {await tearDown()})

describe('GET /api/tasks', () => {
    it('Should return an empty array when no tasks exist.',
    async() => {
        const response = await request(app).get('/api/tasks')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })
})