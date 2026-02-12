import { describe, it, expect, beforeAll, beforeEach, afterAll} from 'vitest';
import request from 'supertest';

import { prisma } from "../lib/prisma.js";
import { setup, dropData, tearDown } from './setup.js';
import app from '../app.js';

beforeAll( async () => {
    await setup();
});

beforeEach( async () => {
    await dropData();
});

afterAll( async () => {
    await tearDown();
});

describe('GET /api/feedback', () => {
    it("should return an empty array when there are no feedback entries", async () => {
        const response = await request(app).get('/feedback');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it("should return all feedback entries", async () => {
        // Arrange - seeding the database
        await prisma.feedback.create({
            data: {
                user_id: 1,
                chapel_session_id: 1,
                stars: 5,
                response: "Great session!"
            }
        });
        // Act - send API request
        const response = await request(app).get('/feedback');
        // Assert - check the response
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });
});