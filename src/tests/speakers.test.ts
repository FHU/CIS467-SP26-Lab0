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
});

afterAll(async () => {
    await tearDown();
});

describe('GET /api/speakers', () => {
    it('should return an empty array when there are no speakers', async () => {
        const response = await request(app).get('/api/speakers');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should return all speakers', async () => {
        await prisma.speaker.create({
            data: {
                first_name: 'John',
                last_name: 'Doe',
                bio: 'A great speaker.',
                title: 'Dr.'
            }
        });

        const response = await request(app).get('/api/speakers');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });
});

describe('GET /api/speakers/:id', () => {
    it('should return a single speaker by id', async () => {
        const speaker = await prisma.speaker.create({
            data: {
                first_name: 'Jane',
                last_name: 'Smith',
                bio: 'An inspiring speaker.',
                title: 'Mrs.'
            }
        });

        const response = await request(app).get(`/api/speakers/${speaker.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(speaker.id);
        expect(response.body.first_name).toBe('Jane');
    });

    it('should return 404 if speaker does not exist', async () => {
        const response = await request(app).get('/api/speakers/999');
        expect(response.status).toBe(404);
    });
});

describe('POST /api/speakers', () => {
    it('should create a new speaker', async () => {
        const response = await request(app)
            .post('/api/speakers')
            .send({
                first_name: 'Mark',
                last_name: 'Taylor',
                bio: 'Speaker bio here.',
                title: 'Prof.'
            });

        expect(response.status).toBe(201);
        expect(response.body.first_name).toBe('Mark');

        const dbSpeakers = await prisma.speaker.findMany();
        expect(dbSpeakers.length).toBe(1);
    });

    it('should use default values when fields are missing', async () => {
        const response = await request(app)
            .post('/api/speakers')
            .send({});

        expect(response.status).toBe(201);
        expect(response.body.first_name).toBe('Unnamed Speaker');
        expect(response.body.bio).toBe('No biography available.');
    });
});

describe('PATCH /api/speakers/:id', () => {
    it('should update a speaker', async () => {
        const speaker = await prisma.speaker.create({
            data: {
                first_name: 'Old',
                last_name: 'Name',
                bio: 'Old bio.'
            }
        });

        const response = await request(app)
            .patch(`/api/speakers/${speaker.id}`)
            .send({ first_name: 'New', bio: 'Updated bio.' });

        expect(response.status).toBe(200);
        expect(response.body.first_name).toBe('New');
        expect(response.body.bio).toBe('Updated bio.');
    });

    it('should return 404 when updating a non-existent speaker', async () => {
        const response = await request(app)
            .patch('/api/speakers/999')
            .send({ first_name: 'Ghost' });

        expect(response.status).toBe(404);
    });
});

describe('DELETE /api/speakers/:id', () => {
    it('should delete a speaker', async () => {
        const speaker = await prisma.speaker.create({
            data: {
                first_name: 'To',
                last_name: 'Delete',
                bio: 'Will be deleted.'
            }
        });

        const response = await request(app).delete(`/api/speakers/${speaker.id}`);
        expect(response.status).toBe(204);

        const dbSpeakers = await prisma.speaker.findMany();
        expect(dbSpeakers.length).toBe(0);
    });

    it('should return 404 when deleting a non-existent speaker', async () => {
        const response = await request(app).delete('/api/speakers/999');
        expect(response.status).toBe(404);
    });
});
