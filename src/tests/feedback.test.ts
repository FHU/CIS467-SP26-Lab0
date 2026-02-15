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

// Test Get all feedback
describe('GET /api/feedback', () => {
    let testUser: any;
    let testSpeaker: any;
    let testSession: any;

    beforeEach(async () => {
      // Create user first
      testUser = await prisma.uSER.create({
        data: {
          email: 'user@example.com',
          first_name: 'Test',
          last_name: 'User',
          type: 'STUDENT'
        }
      });

      // Create speaker
      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'Test',
          last_name: 'Speaker',
          type: 'FACULTY',
          title: 'Dr'
        }
      });

      // Create chapel session
      testSession = await prisma.cHAPEL_SESSION.create({
        data: {
          speaker_id: testSpeaker.id,
          topic: 'Test Chapel',
          date: new Date('2024-03-15'),
          time: new Date('2024-03-15T10:00:00'),
          number_standings: 150
        }
      });

      // Seed feedback data
      await prisma.fEEDBACK.createMany({
        data: [
          {
            stars: 5,
            response: 'Excellent chapel session!',
            user_id: testUser.id,
            chapel_session_id: testSession.id
          },
          {
            stars: 4,
            response: 'Very inspiring message',
            user_id: testUser.id,
            chapel_session_id: testSession.id
          },
          {
            stars: 3,
            response: 'Good but could be better',
            user_id: testUser.id,
            chapel_session_id: testSession.id
          }
        ]
      });
    });

    it('should return all feedback', async () => {
      const response = await request(app)
        .get(`/api/feedback/chapel/${testSession.id}/feedback`)
        .expect(200);

      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('stars');
      expect(response.body[0]).toHaveProperty('response');
    });

    it('should return empty array when no feedback exists', async () => {
      await prisma.fEEDBACK.deleteMany();

      const response = await request(app)
        .get(`/api/feedback/chapel/${testSession.id}/feedback`)
        .expect(200);

      expect(response.body).toEqual([]);
    });
});

// Test Get feedback by id
describe('GET /api/feedback/:id', () => {
    let testUser: any;
    let testSpeaker: any;
    let testSession: any;
    let testFeedback: any;

    beforeEach(async () => {
      // Create user
      testUser = await prisma.uSER.create({
        data: {
          email: 'feedback@example.com',
          type: 'STUDENT'
        }
      });

      // Create speaker
      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'John',
          last_name: 'Doe',
          type: 'FACULTY'
        }
      });

      // Create session
      testSession = await prisma.cHAPEL_SESSION.create({
        data: {
          speaker_id: testSpeaker.id,
          topic: 'Faith and Works',
          date: new Date('2024-04-01'),
          time: new Date('2024-04-01T10:00:00'),
          number_standings: 100
        }
      });

      // Create feedback
      testFeedback = await prisma.fEEDBACK.create({
        data: {
          stars: 5,
          response: 'Amazing session!',
          user_id: testUser.id,
          chapel_session_id: testSession.id
        }
      });
    });

    it("should return a single feedback by id", async () => {
      const response = await request(app)
        .get(`/api/feedback/chapel/${testSession.id}/feedback/${testFeedback.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: testFeedback.id,
        stars: testFeedback.stars,
        response: testFeedback.response,
        user_id: testFeedback.user_id,
        chapel_session_id: testFeedback.chapel_session_id
      });
    });

    it('should return 404 for a feedback id NOT in the database', async () => {
      const nonExistentId = 99999;

      await request(app)
        .get(`/api/feedback/chapel/${testSession.id}/feedback/${nonExistentId}`)
        .expect(404);
    });
});

// Test POST /api/feedback
describe('POST /api/feedback', () => {
    let testUser: any;
    let testSpeaker: any;
    let testSession: any;

    beforeEach(async () => {
      // Create user
      testUser = await prisma.uSER.create({
        data: {
          email: 'newuser@example.com',
          type: 'STUDENT'
        }
      });

      // Create speaker
      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'Jane',
          last_name: 'Smith',
          type: 'FACULTY'
        }
      });

      // Create session
      testSession = await prisma.cHAPEL_SESSION.create({
        data: {
          speaker_id: testSpeaker.id,
          topic: 'Prayer and Meditation',
          date: new Date('2024-05-01'),
          time: new Date('2024-05-01T10:00:00'),
          number_standings: 200
        }
      });
    });

    it('should create a new feedback with all fields', async () => {
      const feedbackData = {
        stars: 5,
        response: 'This was a transformative experience!',
        user_id: testUser.id,
        chapel_session_id: testSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body).toMatchObject({
        stars: feedbackData.stars,
        response: feedbackData.response,
        user_id: feedbackData.user_id,
        chapel_session_id: feedbackData.chapel_session_id
      });
      expect(response.body.id).toBeDefined();
    });

    it('should create feedback with 1 star', async () => {
      const feedbackData = {
        stars: 1,
        response: 'Not what I expected',
        user_id: testUser.id,
        chapel_session_id: testSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.stars).toBe(1);
    });

    it('should create feedback with 3 stars', async () => {
      const feedbackData = {
        stars: 3,
        response: 'Average chapel session',
        user_id: testUser.id,
        chapel_session_id: testSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.stars).toBe(3);
    });

    it('should create feedback with 5 stars', async () => {
      const feedbackData = {
        stars: 5,
        response: 'Perfect!',
        user_id: testUser.id,
        chapel_session_id: testSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.stars).toBe(5);
    });

    it('should create feedback with short response', async () => {
      const feedbackData = {
        stars: 4,
        response: 'Good',
        user_id: testUser.id,
        chapel_session_id: testSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.response).toBe('Good');
    });

    it('should create feedback with long response', async () => {
      const longResponse = 'This chapel session was incredibly meaningful to me. The speaker did an excellent job of connecting the scripture to real-world applications. I particularly appreciated the emphasis on community service and how we can live out our faith in practical ways. The message about compassion and understanding really resonated with me and I plan to implement these principles in my daily life.';
      
      const feedbackData = {
        stars: 5,
        response: longResponse,
        user_id: testUser.id,
        chapel_session_id: testSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.response).toBe(longResponse);
    });
});

// Test DELETE /api/feedback/:id
describe('DELETE /api/feedback/:id', () => {
    let testUser: any;
    let testSpeaker: any;
    let testSession: any;
    let testFeedback: any;

    beforeEach(async () => {
      testUser = await prisma.uSER.create({
        data: {
          email: 'delete@example.com',
          type: 'STUDENT'
        }
      });

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
          topic: 'Test Topic',
          date: new Date('2024-06-01'),
          time: new Date('2024-06-01T10:00:00'),
          number_standings: 50
        }
      });

      testFeedback = await prisma.fEEDBACK.create({
        data: {
          stars: 4,
          response: 'Feedback to delete',
          user_id: testUser.id,
          chapel_session_id: testSession.id
        }
      });
    });

    it('should delete a feedback', async () => {
      await request(app)
        .delete(`/api/feedback/${testFeedback.id}`)
        .expect(204);

      // Verify feedback is deleted
      const deletedFeedback = await prisma.fEEDBACK.findUnique({
        where: { id: testFeedback.id }
      });

      expect(deletedFeedback).toBeNull();
    });
});

// Test feedback with relationships
describe('Feedback with User and Chapel Session Relationships', () => {
    let user1: any;
    let user2: any;
    let speaker: any;
    let session1: any;
    let session2: any;

    beforeEach(async () => {
      // Create multiple users
      user1 = await prisma.uSER.create({
        data: {
          email: 'user1@example.com',
          first_name: 'User',
          last_name: 'One',
          type: 'STUDENT'
        }
      });

      user2 = await prisma.uSER.create({
        data: {
          email: 'user2@example.com',
          first_name: 'User',
          last_name: 'Two',
          type: 'FACULTY'
        }
      });

      // Create speaker
      speaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'Speaker',
          last_name: 'Test',
          type: 'ALUMNI'
        }
      });

      // Create multiple sessions
      session1 = await prisma.cHAPEL_SESSION.create({
        data: {
          speaker_id: speaker.id,
          topic: 'Session 1',
          date: new Date('2024-07-01'),
          time: new Date('2024-07-01T10:00:00'),
          number_standings: 100
        }
      });

      session2 = await prisma.cHAPEL_SESSION.create({
        data: {
          speaker_id: speaker.id,
          topic: 'Session 2',
          date: new Date('2024-07-08'),
          time: new Date('2024-07-08T10:00:00'),
          number_standings: 120
        }
      });

      // Create feedback from different users for different sessions
      await prisma.fEEDBACK.createMany({
        data: [
          {
            stars: 5,
            response: 'User 1 feedback on Session 1',
            user_id: user1.id,
            chapel_session_id: session1.id
          },
          {
            stars: 4,
            response: 'User 1 feedback on Session 2',
            user_id: user1.id,
            chapel_session_id: session2.id
          },
          {
            stars: 5,
            response: 'User 2 feedback on Session 1',
            user_id: user2.id,
            chapel_session_id: session1.id
          },
          {
            stars: 3,
            response: 'User 2 feedback on Session 2',
            user_id: user2.id,
            chapel_session_id: session2.id
          }
        ]
      });
    });

    it('should return all feedback from multiple users and sessions', async () => {
      const response = await request(app)
        .get(`/api/feedback/chapel/${session1.id}/feedback`)
        .expect(200);

      // Debug: Check what we actually got
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2); // session1 has 2 feedback entries
    });

    it('should create feedback for different users on same session', async () => {
      const newUser = await prisma.uSER.create({
        data: {
          email: 'user3@example.com',
          type: 'GUEST'
        }
      });

      const feedbackData = {
        stars: 4,
        response: 'User 3 feedback on Session 1',
        user_id: newUser.id,
        chapel_session_id: session1.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.user_id).toBe(newUser.id);
      expect(response.body.chapel_session_id).toBe(session1.id);
    });

    it('should allow same user to give feedback on multiple sessions', async () => {
      const newSession = await prisma.cHAPEL_SESSION.create({
        data: {
          speaker_id: speaker.id,
          topic: 'Session 3',
          date: new Date('2024-07-15'),
          time: new Date('2024-07-15T10:00:00'),
          number_standings: 110
        }
      });

      const feedbackData = {
        stars: 5,
        response: 'User 1 feedback on Session 3',
        user_id: user1.id,
        chapel_session_id: newSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.user_id).toBe(user1.id);
      expect(response.body.chapel_session_id).toBe(newSession.id);
    });
});

// Test input validation
describe('Input Validation', () => {
    let testUser: any;
    let testSpeaker: any;
    let testSession: any;

    beforeEach(async () => {
      testUser = await prisma.uSER.create({
        data: {
          email: 'validation@example.com',
          type: 'STUDENT'
        }
      });

      testSpeaker = await prisma.sPEAKER.create({
        data: {
          first_name: 'Validation',
          last_name: 'Test',
          type: 'FACULTY'
        }
      });

      testSession = await prisma.cHAPEL_SESSION.create({
        data: {
          speaker_id: testSpeaker.id,
          topic: 'Validation Session',
          date: new Date('2024-08-01'),
          time: new Date('2024-08-01T10:00:00'),
          number_standings: 100
        }
      });
    });

    it('should handle special characters in response', async () => {
      const feedbackData = {
        stars: 5,
        response: "This session was amazing! The speaker's message about God's love & mercy really touched my heart.",
        user_id: testUser.id,
        chapel_session_id: testSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.response).toBe(feedbackData.response);
    });

    it('should handle emoji in response', async () => {
      const feedbackData = {
        stars: 5,
        response: 'Great session! 🙏✨',
        user_id: testUser.id,
        chapel_session_id: testSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.response).toBe(feedbackData.response);
    });

    it('should handle line breaks in response', async () => {
      const feedbackData = {
        stars: 4,
        response: 'First line of feedback.\nSecond line of feedback.\nThird line of feedback.',
        user_id: testUser.id,
        chapel_session_id: testSession.id
      };

      const response = await request(app)
        .post('/api/feedback')
        .send(feedbackData)
        .expect(201);

      expect(response.body.response).toContain('\n');
    });

    it('should test all valid star ratings', async () => {
      const starRatings = [1, 2, 3, 4, 5];

      for (let i = 0; i < starRatings.length; i++) {
        const feedbackData = {
          stars: starRatings[i],
          response: `Feedback with ${starRatings[i]} stars`,
          user_id: testUser.id,
          chapel_session_id: testSession.id
        };

        const response = await request(app)
          .post('/api/feedback')
          .send(feedbackData)
          .expect(201);

        expect(response.body.stars).toBe(starRatings[i]);
      }
    });
});