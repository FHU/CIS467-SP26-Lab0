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

// Test Get all speakers
describe('GET /api/speakers', () => {
    beforeEach(async () => {
      // Seed test data
      await prisma.sPEAKER.createMany({
        data: [
          {
            first_name: 'Alice',
            last_name: 'Smith',
            type: 'STUDENT',
            bio: 'Student speaker',
            title: 'Ms'
          },
          {
            first_name: 'Bob',
            last_name: 'Jones',
            type: 'FACULTY',
            bio: 'Faculty member',
            title: 'Dr'
          },
          {
            first_name: 'Steve',
            last_name: 'Adams',
            type: 'STAFF'
          }
        ]
      });
    });

    it('should return all speakers', async () => {
      const response = await request(app)
        .get('/api/speakers')
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('first_name');
    });

    it('should return empty array when no speakers exist', async () => {
      await prisma.sPEAKER.deleteMany();

      const response = await request(app)
        .get('/api/speakers')
        .expect(200);

      expect(response.body).toEqual([]);
    });
});

// Test Get speaker by id
describe('GET /api/speakers/:id', () => {
    let testSpeaker: any;

    beforeEach(async () => {
      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'Test',
          last_name: 'Speaker',
          type: 'STUDENT',
          bio: 'Test bio',
          title: 'Mr'
        }
      });
    });

    it("should return a single speaker by id", async () => {
      const response = await request(app)
        .get(`/api/speakers/${testSpeaker.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testSpeaker.id,
        first_name: testSpeaker.first_name,
        last_name: testSpeaker.last_name,
        type: testSpeaker.type,
        bio: testSpeaker.bio,
        title: testSpeaker.title
      });
    });

    it('should return 404 for a speaker id NOT in the database', async () => {
      const nonExistentId = 99999;

      await request(app)
        .get(`/api/speakers/${nonExistentId}`)
        .expect(404);
    });
});

// Test POST /api/speakers
describe('POST /api/speakers', () => {
    it('should create a new speaker with all fields', async () => {
      const speakerData = {
        first_name: 'John',
        last_name: 'Doe',
        type: 'STUDENT',
        bio: 'Less manlier than John Deere',
        title: 'Mr'
      };

      const response = await request(app)
        .post('/api/speakers')
        .send(speakerData)
        .expect(201);

      expect(response.body).toMatchObject({
        first_name: speakerData.first_name,
        last_name: speakerData.last_name,
        type: speakerData.type,
        bio: speakerData.bio,
        title: speakerData.title
      });
      expect(response.body.id).toBeDefined();
    });

    it('should create a speaker with only required fields (type)', async () => {
      const speakerData = {
        type: 'FACULTY'
      };

      const response = await request(app)
        .post('/api/speakers')
        .send(speakerData)
        .expect(201);

      expect(response.body).toMatchObject({
        type: speakerData.type
      });
      expect(response.body.first_name).toBeNull();
      expect(response.body.last_name).toBeNull();
      expect(response.body.bio).toBeNull();
      expect(response.body.title).toBeNull();
    });

    it('should create a speaker with partial fields', async () => {
      const speakerData = {
        first_name: 'Jane',
        last_name: 'Smith',
        type: 'ALUMNI'
      };

      const response = await request(app)
        .post('/api/speakers')
        .send(speakerData)
        .expect(201);

      expect(response.body).toMatchObject({
        first_name: speakerData.first_name,
        last_name: speakerData.last_name,
        type: speakerData.type
      });
      expect(response.body.bio).toBeNull();
      expect(response.body.title).toBeNull();
    });

    it('should accept all valid UserType values', async () => {
      const userTypes = ['STUDENT', 'FACULTY', 'STAFF', 'ALUMNI', 'GUEST'];
      
      for (let i = 0; i < userTypes.length; i++) {
        const speakerData = {
          first_name: `Speaker${i}`,
          type: userTypes[i]
        };

        const response = await request(app)
          .post('/api/speakers')
          .send(speakerData)
          .expect(201);

        expect(response.body.type).toBe(userTypes[i]);
      }
    });

    it('should accept all valid Title values', async () => {
      const titles = ['Dr', 'Mr', 'Mrs', 'Ms'];
      
      for (let i = 0; i < titles.length; i++) {
        const speakerData = {
          first_name: `Speaker${i}`,
          type: 'FACULTY',
          title: titles[i]
        };

        const response = await request(app)
          .post('/api/speakers')
          .send(speakerData)
          .expect(201);

        expect(response.body.title).toBe(titles[i]);
      }
    });
});

// Test DELETE /api/speakers/:id
describe('DELETE /api/speakers/:id', () => {
    let testSpeaker: any;

    beforeEach(async () => {
      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'Delete',
          last_name: 'Me',
          type: 'STUDENT'
        }
      });
    });

    it('should delete a speaker', async () => {
      await request(app)
        .delete(`/api/speakers/${testSpeaker.id}`)
        .expect(204);

      // Verify speaker is deleted
      const deletedSpeaker = await prisma.sPEAKER.findUnique({
        where: { id: testSpeaker.id }
      });

      expect(deletedSpeaker).toBeNull();
    });
});
