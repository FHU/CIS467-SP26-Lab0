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

describe('GET /api/users', () => {
    it('should return an empty array when there are no users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('should return all users', async () => {
        await prisma.user.create({
            data: {
                email: 'alice@test.com',
                first_name: 'Alice',
                last_name: 'Smith',
                type: 'STUDENT'
            }
        });

        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });
});

describe('GET /api/users/:id', () => {
    it('should return a single user by id', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'bob@test.com',
                first_name: 'Bob',
                last_name: 'Jones',
                type: 'FACULTY'
            }
        });

        const response = await request(app).get(`/api/users/${user.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(user.id);
        expect(response.body.email).toBe('bob@test.com');
    });

    it('should return 404 if user does not exist', async () => {
        const response = await request(app).get('/api/users/999');
        expect(response.status).toBe(404);
    });
});

describe('POST /api/users', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                email: 'carol@test.com',
                first_name: 'Carol',
                last_name: 'White',
                type: 'STAFF'
            });

        expect(response.status).toBe(201);
        expect(response.body.email).toBe('carol@test.com');

        const dbUsers = await prisma.user.findMany();
        expect(dbUsers.length).toBe(1);
    });

    it('should default type to STUDENT when type is not provided', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                email: 'dave@test.com',
                first_name: 'Dave',
                last_name: 'Brown'
            });

        expect(response.status).toBe(201);
        expect(response.body.type).toBe('STUDENT');
    });
});

describe('PATCH /api/users/:id', () => {
    it('should update a user', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'eve@test.com',
                first_name: 'Eve',
                last_name: 'Black',
                type: 'STUDENT'
            }
        });

        const response = await request(app)
            .patch(`/api/users/${user.id}`)
            .send({ first_name: 'Evelyn', type: 'ALUMNI' });

        expect(response.status).toBe(200);
        expect(response.body.first_name).toBe('Evelyn');
        expect(response.body.type).toBe('ALUMNI');
    });

    it('should return 404 when updating a non-existent user', async () => {
        const response = await request(app)
            .patch('/api/users/999')
            .send({ first_name: 'Ghost' });

        expect(response.status).toBe(404);
    });
});

describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'frank@test.com',
                first_name: 'Frank',
                last_name: 'Green',
                type: 'GUEST'
            }
        });

        const response = await request(app).delete(`/api/users/${user.id}`);
        expect(response.status).toBe(204);

        const dbUsers = await prisma.user.findMany();
        expect(dbUsers.length).toBe(0);
    });

    it('should return 404 when deleting a non-existent user', async () => {
        const response = await request(app).delete('/api/users/999');
        expect(response.status).toBe(404);
    });
});
