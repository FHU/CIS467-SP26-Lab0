import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";

import { prisma } from "../lib/prisma.js"
import { setup, dropData, tearDown } from "./setup.js"
import app from "../app.js";

beforeAll(async () => {
    await setup();  
});

beforeEach(async () => {
    await dropData();
});

afterAll(async () => {
    await tearDown();
});

// Test Get all users
describe('GET /api/users', () => {
    beforeEach(async () => {
      // Seed test data
      await prisma.uSER.createMany({
        data: [
          {
            email: 'user1@example.com',
            first_name: 'Alice',
            last_name: 'Smith',
            type: 'STUDENT'
          },
          {
            email: 'user2@example.com',
            first_name: 'Bob',
            last_name: 'Jones',
            type: 'STUDENT'
          },
          {
            email: 'user3@example.com',
            type: 'STUDENT'
          }
        ]
      });
    });

    it('should return all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('email');
    });

    it('should return empty array when no users exist', async () => {
      await prisma.uSER.deleteMany();

      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body).toEqual([]);
    });
});

// Test Get user by id
describe('GET /api/users/:id', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await prisma.uSER.create({
        data: {
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User',
          type: 'STUDENT'
        }
      });
    });

    it("should return a single user by id", async () => {
      const response = await request(app)
        .get(`/api/users/${testUser.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testUser.id,
        email: testUser.email,
        first_name: testUser.first_name,
        last_name: testUser.last_name,
        type: testUser.type
      });
    });

    it('should return 404 for a user id NOT in the database', async () => {
      const nonExistentId = 99999;

      await request(app)
        .get(`/api/users/${nonExistentId}`)
        .expect(404);
    });
});

// Test POST /api/users
describe('POST /api/users', () => {
    it('should create a new user with all fields', async () => {
      const userData = {
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        type: 'STUDENT'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        type: userData.type
      });
      expect(response.body.id).toBeDefined();
    });

    it('should create a user with only required fields', async () => {
      const userData = {
        email: 'jane@example.com',
        type: 'FACULTY'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        email: userData.email,
        type: userData.type
      });
      expect(response.body.first_name).toBeNull();
      expect(response.body.last_name).toBeNull();
    });

    it('should accept all valid UserType values', async () => {
      const userTypes = ['STUDENT', 'FACULTY', 'STAFF', 'ALUMNI', 'GUEST'];
      
      for (let i = 0; i < userTypes.length; i++) {
        const userData = {
          email: `user${i}@example.com`,
          type: userTypes[i]
        };

        const response = await request(app)
          .post('/api/users')
          .send(userData)
          .expect(201);

        expect(response.body.type).toBe(userTypes[i]);
      }
    });
});

// Test DELETE /api/users/:id
describe('DELETE /api/users/:id', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await prisma.uSER.create({
        data: {
          email: 'delete@example.com',
          first_name: 'Delete',
          type: 'STUDENT'
        }
      });
    });

    it('should delete a user', async () => {
      await request(app)
        .delete(`/api/users/${testUser.id}`)
        .expect(204);

      // Verify user is deleted
      const deletedUser = await prisma.uSER.findUnique({
        where: { id: testUser.id }
      });

      expect(deletedUser).toBeNull();
    });
});
