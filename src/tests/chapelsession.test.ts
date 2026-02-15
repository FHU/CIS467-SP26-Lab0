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

// Test Get all chapel sessions
describe('GET /api/chapel-sessions', () => {
    let testSpeaker: any;

    beforeEach(async () => {
      // Create a speaker first since chapel sessions require a speaker_id
      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'Test',
          last_name: 'Speaker',
          type: 'FACULTY',
          title: 'Dr'
        }
      });

      // Seed test data
      await prisma.cHAPEL_SESSION.createMany({
        data: [
          {
            speaker_id: testSpeaker.id,
            topic: 'Faith and Science',
            date: new Date('2024-03-15'),
            time: new Date('2024-03-15T10:00:00'),
            number_standings: 150
          },
          {
            speaker_id: testSpeaker.id,
            topic: 'Community Service',
            date: new Date('2024-03-22'),
            time: new Date('2024-03-22T10:00:00'),
            number_standings: 200
          },
          {
            speaker_id: testSpeaker.id,
            topic: 'Leadership in Christianity',
            date: new Date('2024-03-29'),
            time: new Date('2024-03-29T10:00:00'),
            number_standings: 175
          }
        ]
      });
    });

    it('should return all chapel sessions', async () => {
      const response = await request(app)
        .get('/api/chapel')
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('topic');
      expect(response.body[0]).toHaveProperty('speaker_id');
    });

    it('should return empty array when no chapel sessions exist', async () => {
      await prisma.cHAPEL_SESSION.deleteMany();

      const response = await request(app)
        .get('/api/chapel')
        .expect(200);

      expect(response.body).toEqual([]);
    });
});

// Test Get chapel session by id
describe('GET /api/chapel/:id', () => {
    let testSpeaker: any;
    let testSession: any;

    beforeEach(async () => {
      // Create a speaker first
      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'John',
          last_name: 'Doe',
          type: 'FACULTY',
          title: 'Dr'
        }
      });

      testSession = await prisma.cHAPEL_SESSION.create({
        data: {
          speaker_id: testSpeaker.id,
          topic: 'Test Chapel Session',
          date: new Date('2024-04-01'),
          time: new Date('2024-04-01T10:00:00'),
          number_standings: 100
        }
      });
    });

    it("should return a single chapel session by id", async () => {
      const response = await request(app)
        .get(`/api/chapel/${testSession.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testSession.id,
        speaker_id: testSession.speaker_id,
        topic: testSession.topic,
        number_standings: testSession.number_standings
      });
    });

    it('should return 404 for a chapel session id NOT in the database', async () => {
      const nonExistentId = 99999;

      await request(app)
        .get(`/api/chapel/${nonExistentId}`)
        .expect(404);
    });
});

// Test POST /api/chapel-sessions
describe('POST /api/chapel', () => {
    let testSpeaker: any;

    beforeEach(async () => {
      // Create a speaker for the chapel sessions
      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'Jane',
          last_name: 'Smith',
          type: 'FACULTY',
          title: 'Dr'
        }
      });
    });

    it('should create a new chapel session with all fields', async () => {
      const sessionData = {
        speaker_id: testSpeaker.id,
        topic: 'The Power of Prayer',
        date: new Date('2024-05-01').toISOString(),
        time: new Date('2024-05-01T11:00:00').toISOString(),
        number_standings: 250
      };

      const response = await request(app)
        .post('/api/chapel')
        .send(sessionData)
        .expect(201);

      expect(response.body).toMatchObject({
        speaker_id: sessionData.speaker_id,
        topic: sessionData.topic,
        number_standings: sessionData.number_standings
      });
      expect(response.body.id).toBeDefined();
    });

    it('should create a chapel session with zero attendees', async () => {
      const sessionData = {
        speaker_id: testSpeaker.id,
        topic: 'New Session',
        date: new Date('2024-05-15').toISOString(),
        time: new Date('2024-05-15T10:00:00').toISOString(),
        number_standings: 0
      };

      const response = await request(app)
        .post('/api/chapel')
        .send(sessionData)
        .expect(201);

      expect(response.body.number_standings).toBe(0);
    });

    it('should create a chapel session with high attendance', async () => {
      const sessionData = {
        speaker_id: testSpeaker.id,
        topic: 'Popular Topic',
        date: new Date('2024-06-01').toISOString(),
        time: new Date('2024-06-01T10:00:00').toISOString(),
        number_standings: 500
      };

      const response = await request(app)
        .post('/api/chapel')
        .send(sessionData)
        .expect(201);

      expect(response.body.number_standings).toBe(500);
    });

    it('should handle future dates', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);

      const sessionData = {
        speaker_id: testSpeaker.id,
        topic: 'Future Session',
        date: futureDate.toISOString(),
        time: futureDate.toISOString(),
        number_standings: 100
      };

      const response = await request(app)
        .post('/api/chapel')
        .send(sessionData)
        .expect(201);

      expect(response.body.topic).toBe('Future Session');
    });

    it('should handle past dates', async () => {
      const pastDate = new Date('2023-01-01');

      const sessionData = {
        speaker_id: testSpeaker.id,
        topic: 'Past Session',
        date: pastDate.toISOString(),
        time: pastDate.toISOString(),
        number_standings: 150
      };

      const response = await request(app)
        .post('/api/chapel')
        .send(sessionData)
        .expect(201);

      expect(response.body.topic).toBe('Past Session');
    });
});

// Test DELETE /api/chapel-sessions/:id
describe('DELETE /api/chapel/:id', () => {
    let testSpeaker: any;
    let testSession: any;

    beforeEach(async () => {
      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'Delete',
          last_name: 'Test',
          type: 'FACULTY'
        }
      });

      testSession = await prisma.cHAPEL_SESSION.create({
        data: {
          speaker_id: testSpeaker.id,
          topic: 'Session to Delete',
          date: new Date('2024-07-01'),
          time: new Date('2024-07-01T10:00:00'),
          number_standings: 75
        }
      });
    });

    it('should delete a chapel session', async () => {
      await request(app)
        .delete(`/api/chapel/${testSession.id}`)
        .expect(204);

      // Verify session is deleted
      const deletedSession = await prisma.cHAPEL_SESSION.findUnique({
        where: { id: testSession.id }
      });

      expect(deletedSession).toBeNull();
    });
});

// Test chapel sessions with speaker relationship
describe('Chapel Sessions with Speaker Relationship', () => {
    let speaker1: any;
    let speaker2: any;

    beforeEach(async () => {
      speaker1 = await prisma.sPEAKER.create({
        data: {
          first_name: 'Speaker',
          last_name: 'One',
          type: 'FACULTY',
          title: 'Dr'
        }
      });

      speaker2 = await prisma.sPEAKER.create({
        data: {
          first_name: 'Speaker',
          last_name: 'Two',
          type: 'ALUMNI',
          title: 'Mr'
        }
      });

      // Create sessions for different speakers
      await prisma.cHAPEL_SESSION.createMany({
        data: [
          {
            speaker_id: speaker1.id,
            topic: 'Session by Speaker 1',
            date: new Date('2024-08-01'),
            time: new Date('2024-08-01T10:00:00'),
            number_standings: 100
          },
          {
            speaker_id: speaker1.id,
            topic: 'Another Session by Speaker 1',
            date: new Date('2024-08-08'),
            time: new Date('2024-08-08T10:00:00'),
            number_standings: 120
          },
          {
            speaker_id: speaker2.id,
            topic: 'Session by Speaker 2',
            date: new Date('2024-08-15'),
            time: new Date('2024-08-15T10:00:00'),
            number_standings: 90
          }
        ]
      });
    });

    it('should return sessions when querying all', async () => {
      const response = await request(app)
        .get('/api/chapel')
        .expect(200);

      expect(response.body).toHaveLength(3);
    });

    it('should create session with valid speaker_id', async () => {
      const sessionData = {
        speaker_id: speaker1.id,
        topic: 'New Session for Speaker 1',
        date: new Date('2024-09-01').toISOString(),
        time: new Date('2024-09-01T10:00:00').toISOString(),
        number_standings: 130
      };

      const response = await request(app)
        .post('/api/chapel')
        .send(sessionData)
        .expect(201);

      expect(response.body.speaker_id).toBe(speaker1.id);
    });
});