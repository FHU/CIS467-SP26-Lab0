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
    await prisma.user.create({
    data: {
        id: 1,
        email: "test@test.com",
        first_name: "Test",
        last_name: "User",
        type: "STUDENT"
    }
});

await prisma.speaker.create({
    data: {
        id: 1,
        first_name: "John",
        last_name: "Smith",
        bio: "Speaker bio",
        title: "Dr.",
    }
});

await prisma.chapelSession.create({
    data: {
        id: 1,
        speaker_id: 1,
        topic: "Faith",
        date: new Date(),
        end_time: new Date(),
        number_standings: 100
    }
});
});

afterAll( async () => {
    await tearDown();
});

describe('GET /api/feedbacks', () => {
    it("should return an empty array when there are no feedback entries", async () => {
        const response = await request(app).get('/api/feedbacks');
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
        const response = await request(app).get('/api/feedbacks');
        // Assert - check the response
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });
});

describe('GET /api/feedbacks/:id', () => {
    it("should return a single feedback entry", async () => {

        const feedback = await prisma.feedback.create({
            data: {
                user_id: 1,
                chapel_session_id: 1,
                stars: 4,
                response: "Good chapel"
            }
        });

        const response = await request(app).get(`/api/feedbacks/${feedback.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(feedback.id);
        expect(response.body.stars).toBe(4);
    });

    it("should return 404 if feedback does not exist", async () => {
        const response = await request(app).get('/api/feedbacks/999');

        expect(response.status).toBe(404);
    });
});

describe('POST /api/feedbacks', () => {
    it("should create a new feedback entry", async () => {

        const newFeedback = {
            user_id: 1,
            chapel_session_id: 1,
            stars: 5,
            response: "Excellent!"
        };

        const response = await request(app)
            .post('/api/feedbacks')
            .send(newFeedback);

        expect(response.status).toBe(201);
        expect(response.body.stars).toBe(5);

        const dbFeedback = await prisma.feedback.findMany();
        expect(dbFeedback.length).toBe(1);
    });

    it("should fail if stars are missing", async () => {
        const response = await request(app)
            .post('/api/feedbacks')
            .send({
                user_id: 1,
                chapel_session_id: 1
            });

        expect(response.status).toBe(400);
    });
});

describe('PATCH /api/feedbacks/:id', () => {
    it("should update feedback", async () => {

        const feedback = await prisma.feedback.create({
            data: {
                user_id: 1,
                chapel_session_id: 1,
                stars: 3,
                response: "Okay"
            }
        });

        const response = await request(app)
            .patch(`/api/feedbacks/${feedback.id}`)
            .send({
                stars: 5,
                response: "Actually great!"
            });

        expect(response.status).toBe(200);
        expect(response.body.stars).toBe(5);
    });
});

describe('DELETE /api/feedbacks/:id', () => {
    it("should delete feedback", async () => {

        const feedback = await prisma.feedback.create({
            data: {
                user_id: 1,
                chapel_session_id: 1,
                stars: 4,
                response: "Nice"
            }
        });

        const response = await request(app)
            .delete(`/api/feedbacks/${feedback.id}`);

        expect(response.status).toBe(204);

        const dbFeedback = await prisma.feedback.findMany();
        expect(dbFeedback.length).toBe(0);
    });
});