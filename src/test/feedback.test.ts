import {describe, it, expect, beforeAll, beforeEach, afterAll} from 'vitest';
import request from 'supertest';

import {prisma} from '../lib/prisma.js';
import {setup, dropData, teardown} from './setup.js';
import app from '../app.js';
import { UserType } from '../generated/prisma/enums.js';


describe('Feedback CRUD Operations', () => {
  let testUserId: number;
  let testSpeakerId: number;
  let testSessionId: number;
  let createdFeedbackId: number;

  beforeAll(async () => {
    await setup();  // Run once before ALL tests
  });

  beforeEach(async () => {
    await dropData();  // Run before EACH test to reset data
  });

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        email: 'feedback.tester@university.edu',
        first_name: 'Feedback',
        last_name: 'Tester',
        user_type: UserType.STUDENT,
      },
    });
    testUserId = user.id;

    const speaker = await prisma.speaker.create({
      data: {
        first_name: 'Chapel',
        last_name: 'Speaker',
        title: 'Guest Speaker',
        user_type: UserType.GUEST,
      },
    });
    testSpeakerId = speaker.id;

    const session = await prisma.chapelSession.create({
      data: {
        speaker_id: testSpeakerId,
        topic: 'Test Chapel Session',
      },
    });
    testSessionId = session.id;
  });

  afterAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.chapelSession.delete({ where: { id: testSessionId } });
    await prisma.speaker.delete({ where: { id: testSpeakerId } });
    await prisma.user.delete({ where: { id: testUserId } });
    await prisma.$disconnect();
  });

  it('CREATE: Should create feedback with all fields', async () => {
    const feedback = await prisma.feedback.create({
      data: {
        stars: 5,
        response: 'Excellent message, very inspiring!',
        user_id: testUserId,
        chapel_session_id: testSessionId,
        speakerId: testSpeakerId,
      },
    });

    expect(feedback).toHaveProperty('id');
    expect(feedback.stars).toBe(5);
    expect(feedback.response).toBe('Excellent message, very inspiring!');
    expect(feedback.user_id).toBe(testUserId);
    expect(feedback.chapel_session_id).toBe(testSessionId);
    expect(feedback.speakerId).toBe(testSpeakerId);
    
    createdFeedbackId = feedback.id;
  });

  it('CREATE: Should create feedback without optional fields', async () => {
    const feedback = await prisma.feedback.create({
      data: {
        stars: 4,
        user_id: testUserId,
        chapel_session_id: testSessionId,
      },
    });

    expect(feedback.response).toBeNull();
    expect(feedback.speakerId).toBeNull();
  });

  it('CREATE: Should validate star rating boundaries', async () => {
    const feedbackLow = await prisma.feedback.create({
      data: {
        stars: 1,
        user_id: testUserId,
        chapel_session_id: testSessionId,
      },
    });

    const feedbackHigh = await prisma.feedback.create({
      data: {
        stars: 5,
        user_id: testUserId,
        chapel_session_id: testSessionId,
      },
    });

    expect(feedbackLow.stars).toBe(1);
    expect(feedbackHigh.stars).toBe(5);
  });

  it('READ: Should retrieve feedback by id', async () => {
    const feedback = await prisma.feedback.findUnique({
      where: { id: createdFeedbackId },
    });

    expect(feedback).not.toBeNull();
    expect(feedback?.stars).toBe(5);
  });

  it('READ: Should retrieve feedback with all relations', async () => {
    const feedback = await prisma.feedback.findUnique({
      where: { id: createdFeedbackId },
      include: {
        user: true,
        chapel_session: true,
        speaker: true,
      },
    });

    expect(feedback).not.toBeNull();
    expect(feedback?.user.email).toBe('feedback.tester@university.edu');
    expect(feedback?.chapel_session.topic).toBe('Test Chapel Session');
    expect(feedback?.speaker?.first_name).toBe('Chapel');
  });

  it('READ: Should retrieve all feedback for a user', async () => {
    const feedbacks = await prisma.feedback.findMany({
      where: { user_id: testUserId },
    });

    expect(feedbacks.length).toBeGreaterThan(0);
  });

  it('READ: Should retrieve all feedback for a session', async () => {
    const feedbacks = await prisma.feedback.findMany({
      where: { chapel_session_id: testSessionId },
    });

    expect(feedbacks.length).toBeGreaterThan(0);
  });

  it('READ: Should calculate average rating for a session', async () => {
    const feedbacks = await prisma.feedback.findMany({
      where: { chapel_session_id: testSessionId },
      select: { stars: true },
    });

    const average = feedbacks.reduce((sum, f) => sum + f.stars, 0) / feedbacks.length;
    
    expect(average).toBeGreaterThan(0);
    expect(average).toBeLessThanOrEqual(5);
  });

  it('READ: Should filter feedback by star rating', async () => {
    const highRatings = await prisma.feedback.findMany({
      where: {
        stars: { gte: 4 },
      },
    });

    expect(highRatings.every(f => f.stars >= 4)).toBe(true);
  });

  it('UPDATE: Should update feedback', async () => {
    const updatedFeedback = await prisma.feedback.update({
      where: { id: createdFeedbackId },
      data: {
        stars: 4,
        response: 'Updated: Very good message!',
      },
    });

    expect(updatedFeedback.stars).toBe(4);
    expect(updatedFeedback.response).toBe('Updated: Very good message!');
  });

  it('DELETE: Should delete feedback', async () => {
    const feedbackToDelete = await prisma.feedback.create({
      data: {
        stars: 3,
        user_id: testUserId,
        chapel_session_id: testSessionId,
      },
    });

    const deletedFeedback = await prisma.feedback.delete({
      where: { id: feedbackToDelete.id },
    });

    expect(deletedFeedback.id).toBe(feedbackToDelete.id);

    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackToDelete.id },
    });

    expect(feedback).toBeNull();
  });
});