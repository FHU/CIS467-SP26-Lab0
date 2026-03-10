import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import request from 'supertest';

import { prisma } from '../lib/prisma.js';
import { setup, dropData, tearDown } from './setup.js';
import app from '../app.js';

beforeAll(async () => {
    await setup();
});

beforeEach(async () => {
    await dropData();
    // Chapel sessions require a speaker (FK constraint)
    await prisma.speaker.create({
        data: {
            id: 1,
            first_name: 'John',
            last_name: 'Smith',
            bio: 'Speaker bio',
            title: 'Dr.'
        }
    });
});

afterAll(async () => {
    await tearDown();
});

describe('GET /api/chapelsessions', () => {
    it('should return an empty array when there are no chapel sessions', async () => {
        const response = await request(app).get('/api/chapelsessions');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should return all chapel sessions', async () => {
        await prisma.chapelSession.create({
            data: {
                speaker_id: 1,
                topic: 'Faith',
                date: new Date(),
                end_time: new Date(),
                number_standings: 50
            }
        });

        const response = await request(app).get('/api/chapelsessions');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });
});

describe('GET /api/chapelsessions/:id', () => {
    it('should return a single chapel session by id', async () => {
        const session = await prisma.chapelSession.create({
            data: {
                speaker_id: 1,
                topic: 'Hope',
                date: new Date(),
                end_time: new Date(),
                number_standings: 75
            }
        });

        const response = await request(app).get(`/api/chapelsessions/${session.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(session.id);
        expect(response.body.topic).toBe('Hope');
    });

    it('should return 404 if chapel session does not exist', async () => {
        const response = await request(app).get('/api/chapelsessions/999');
        expect(response.status).toBe(404);
    });
});

describe('POST /api/chapelsessions', () => {
    it('should create a new chapel session', async () => {
        const response = await request(app)
            .post('/api/chapelsessions')
            .send({
                speaker_id: 1,
                date: new Date().toISOString(),
                end_time: new Date().toISOString(),
                number_standings: 100
            });

        expect(response.status).toBe(201);

        const dbSessions = await prisma.chapelSession.findMany();
        expect(dbSessions.length).toBe(1);
    });
});

describe('PATCH /api/chapelsessions/:id', () => {
    it('should update a chapel session', async () => {
        const session = await prisma.chapelSession.create({
            data: {
                speaker_id: 1,
                topic: 'Original Topic',
                date: new Date(),
                end_time: new Date(),
                number_standings: 10
            }
        });

        const response = await request(app)
            .patch(`/api/chapelsessions/${session.id}`)
            .send({ number_standings: 99 });

        expect(response.status).toBe(200);
        expect(response.body.number_standings).toBe(99);
    });

    it('should return 404 when updating a non-existent chapel session', async () => {
        const response = await request(app)
            .patch('/api/chapelsessions/999')
            .send({ number_standings: 5 });

        expect(response.status).toBe(404);
    });
});

describe('DELETE /api/chapelsessions/:id', () => {
    it('should delete a chapel session', async () => {
        const session = await prisma.chapelSession.create({
            data: {
                speaker_id: 1,
                topic: 'To Delete',
                date: new Date(),
                end_time: new Date(),
                number_standings: 0
            }
        });

        const response = await request(app).delete(`/api/chapelsessions/${session.id}`);
        expect(response.status).toBe(204);

        const dbSessions = await prisma.chapelSession.findMany();
        expect(dbSessions.length).toBe(0);
    });

    it('should return 404 when deleting a non-existent chapel session', async () => {
        const response = await request(app).delete('/api/chapelsessions/999');
        expect(response.status).toBe(404);
    });
});
