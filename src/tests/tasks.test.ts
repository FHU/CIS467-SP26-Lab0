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

    it('Should return all tasks.',
    async() => {
        const task1 = await prisma.task.createMany({
            data: [
                {title: "Task 1"},
                {title: "Task 2"},
            ]
        })

        const response = await request(app).get('/api/tasks')

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)
        expect(response.body[0]).toHaveProperty('title', 'Task 1')
        expect(response.body[0]).toHaveProperty('completed', false)
        expect(response.body[1]).toHaveProperty('title', 'Task 2')
        expect(response.body[1]).toHaveProperty('completed', false)
    })
})



// put this in second describe block
// it("Should return 404 when task not found.",
// async () => {
//     const response = await request(app).get('/api/tasks/999')
//     expect(response.status).toBe(404)
//     expect(response.body).toHaveProperty('error', 'Task not found')
// })