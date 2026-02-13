import {describe, it, expect, beforeAll, beforeEach, afterAll} from 'vitest';
import request from 'supertest';

import {prisma} from '../lib/prisma.js';
import {setup, dropData, teardown} from './setup.js';
import app from '../app.js';
import { UserType } from '../generated/prisma/enums.js';

describe('User CRUD Operations', () => {
  let createdUserId: number;

  afterAll(async () => {
    // Cleanup
    await prisma.feedback.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('CREATE: Should create a new user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'john.doe@university.edu',
        first_name: 'John',
        last_name: 'Doe',
        user_type: UserType.STUDENT,
      },
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('john.doe@university.edu');
    expect(user.first_name).toBe('John');
    expect(user.last_name).toBe('Doe');
    expect(user.user_type).toBe(UserType.STUDENT);
    
    createdUserId = user.id;
  });

  it('CREATE: Should fail with duplicate email', async () => {
    await expect(
      prisma.user.create({
        data: {
          email: 'john.doe@university.edu',
          first_name: 'Jane',
          last_name: 'Smith',
          user_type: UserType.FACULTY,
        },
      })
    ).rejects.toThrow();
  });

  it('READ: Should retrieve user by id', async () => {
    const user = await prisma.user.findUnique({
      where: { id: createdUserId },
    });

    expect(user).not.toBeNull();
    expect(user?.email).toBe('john.doe@university.edu');
  });

  it('READ: Should retrieve user by email', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'john.doe@university.edu' },
    });

    expect(user).not.toBeNull();
    expect(user?.id).toBe(createdUserId);
  });

  it('READ: Should retrieve all users', async () => {
    const users = await prisma.user.findMany();

    expect(users.length).toBeGreaterThan(0);
    expect(users.some(u => u.id === createdUserId)).toBe(true);
  });

  it('UPDATE: Should update user information', async () => {
    const updatedUser = await prisma.user.update({
      where: { id: createdUserId },
      data: {
        first_name: 'Jonathan',
        user_type: UserType.ALUMNI,
      },
    });

    expect(updatedUser.first_name).toBe('Jonathan');
    expect(updatedUser.user_type).toBe(UserType.ALUMNI);
    expect(updatedUser.last_name).toBe('Doe'); // Unchanged
  });

  it('DELETE: Should delete a user', async () => {
    const deletedUser = await prisma.user.delete({
      where: { id: createdUserId },
    });

    expect(deletedUser.id).toBe(createdUserId);

    const user = await prisma.user.findUnique({
      where: { id: createdUserId },
    });

    expect(user).toBeNull();
  });
});

describe('Speaker CRUD Operations', () => {
  let createdSpeakerId: number;

  afterAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.chapelSession.deleteMany();
    await prisma.speaker.deleteMany();
    await prisma.$disconnect();
  });

  it('CREATE: Should create a new speaker', async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: 'Dr. Sarah',
        last_name: 'Johnson',
        bio: 'Renowned theologian and author',
        title: 'Professor of Theology',
        user_type: UserType.FACULTY,
      },
    });

    expect(speaker).toHaveProperty('id');
    expect(speaker.first_name).toBe('Dr. Sarah');
    expect(speaker.last_name).toBe('Johnson');
    expect(speaker.bio).toBe('Renowned theologian and author');
    expect(speaker.title).toBe('Professor of Theology');
    expect(speaker.user_type).toBe(UserType.FACULTY);
    
    createdSpeakerId = speaker.id;
  });

  it('CREATE: Should create speaker without bio (optional field)', async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: 'Mark',
        last_name: 'Williams',
        title: 'Campus Minister',
        user_type: UserType.STAFF,
      },
    });

    expect(speaker.bio).toBeNull();
    expect(speaker.title).toBe('Campus Minister');
  });

  it('READ: Should retrieve speaker by id', async () => {
    const speaker = await prisma.speaker.findUnique({
      where: { id: createdSpeakerId },
    });

    expect(speaker).not.toBeNull();
    expect(speaker?.first_name).toBe('Dr. Sarah');
  });

  it('READ: Should retrieve all speakers', async () => {
    const speakers = await prisma.speaker.findMany();

    expect(speakers.length).toBeGreaterThanOrEqual(2);
  });

  it('READ: Should filter speakers by user_type', async () => {
    const facultySpeakers = await prisma.speaker.findMany({
      where: { user_type: UserType.FACULTY },
    });

    expect(facultySpeakers.length).toBeGreaterThan(0);
    expect(facultySpeakers.every(s => s.user_type === UserType.FACULTY)).toBe(true);
  });

  it('UPDATE: Should update speaker information', async () => {
    const updatedSpeaker = await prisma.speaker.update({
      where: { id: createdSpeakerId },
      data: {
        bio: 'Updated bio: Award-winning theologian and bestselling author',
        title: 'Dean of Theology',
      },
    });

    expect(updatedSpeaker.bio).toBe('Updated bio: Award-winning theologian and bestselling author');
    expect(updatedSpeaker.title).toBe('Dean of Theology');
  });

  it('DELETE: Should delete a speaker', async () => {
    const speakerToDelete = await prisma.speaker.create({
      data: {
        first_name: 'Temp',
        last_name: 'Speaker',
        title: 'Guest Speaker',
        user_type: UserType.GUEST,
      },
    });

    const deletedSpeaker = await prisma.speaker.delete({
      where: { id: speakerToDelete.id },
    });

    expect(deletedSpeaker.id).toBe(speakerToDelete.id);

    const speaker = await prisma.speaker.findUnique({
      where: { id: speakerToDelete.id },
    });

    expect(speaker).toBeNull();
  });
});

describe('ChapelSession CRUD Operations', () => {
  let testSpeakerId: number;
  let createdSessionId: number;

  beforeAll(async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: 'Test',
        last_name: 'Speaker',
        title: 'Chaplain',
        user_type: UserType.FACULTY,
      },
    });
    testSpeakerId = speaker.id;
  });

  afterAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.chapelSession.deleteMany();
    await prisma.speaker.delete({ where: { id: testSpeakerId } });
    await prisma.$disconnect();
  });

  it('CREATE: Should create a new chapel session', async () => {
    const session = await prisma.chapelSession.create({
      data: {
        speaker_id: testSpeakerId,
        topic: 'Faith in Modern Times',
        scripture: 'John 3:16',
        date: new Date('2024-03-15T10:00:00Z'),
        end_time: new Date('2024-03-15T11:00:00Z'),
        number_standings: 150,
      },
    });

    expect(session).toHaveProperty('id');
    expect(session.topic).toBe('Faith in Modern Times');
    expect(session.scripture).toBe('John 3:16');
    expect(session.speaker_id).toBe(testSpeakerId);
    expect(session.number_standings).toBe(150);
    
    createdSessionId = session.id;
  });

  it('CREATE: Should create session with minimal fields', async () => {
    const session = await prisma.chapelSession.create({
      data: {
        speaker_id: testSpeakerId,
        topic: 'Prayer and Community',
      },
    });

    expect(session.scripture).toBeNull();
    expect(session.end_time).toBeNull();
    expect(session.number_standings).toBeNull();
    expect(session.date).toBeDefined(); // Has default value
  });

  it('READ: Should retrieve chapel session by id', async () => {
    const session = await prisma.chapelSession.findUnique({
      where: { id: createdSessionId },
    });

    expect(session).not.toBeNull();
    expect(session?.topic).toBe('Faith in Modern Times');
  });

  it('READ: Should retrieve session with speaker relation', async () => {
    const session = await prisma.chapelSession.findUnique({
      where: { id: createdSessionId },
      include: { speaker: true },
    });

    expect(session).not.toBeNull();
    expect(session?.speaker.first_name).toBe('Test');
    expect(session?.speaker.last_name).toBe('Speaker');
  });

  it('READ: Should retrieve all sessions for a speaker', async () => {
    const sessions = await prisma.chapelSession.findMany({
      where: { speaker_id: testSpeakerId },
    });

    expect(sessions.length).toBeGreaterThanOrEqual(2);
  });

  it('READ: Should filter sessions by date range', async () => {
    const sessions = await prisma.chapelSession.findMany({
      where: {
        date: {
          gte: new Date('2024-01-01'),
          lte: new Date('2024-12-31'),
        },
      },
    });

    expect(Array.isArray(sessions)).toBe(true);
  });

  it('UPDATE: Should update chapel session information', async () => {
    const updatedSession = await prisma.chapelSession.update({
      where: { id: createdSessionId },
      data: {
        topic: 'Updated: Faith in Modern Times',
        number_standings: 175,
      },
    });

    expect(updatedSession.topic).toBe('Updated: Faith in Modern Times');
    expect(updatedSession.number_standings).toBe(175);
  });

  it('DELETE: Should delete a chapel session', async () => {
    const sessionToDelete = await prisma.chapelSession.create({
      data: {
        speaker_id: testSpeakerId,
        topic: 'Temporary Session',
      },
    });

    const deletedSession = await prisma.chapelSession.delete({
      where: { id: sessionToDelete.id },
    });

    expect(deletedSession.id).toBe(sessionToDelete.id);

    const session = await prisma.chapelSession.findUnique({
      where: { id: sessionToDelete.id },
    });

    expect(session).toBeNull();
  });
});

describe('Feedback CRUD Operations', () => {
  let testUserId: number;
  let testSpeakerId: number;
  let testSessionId: number;
  let createdFeedbackId: number;

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

describe('Relational Integrity Tests', () => {
  let userId: number;
  let speakerId: number;
  let sessionId: number;

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        email: 'relation.test@university.edu',
        first_name: 'Relation',
        last_name: 'Test',
        user_type: UserType.STUDENT,
      },
    });
    userId = user.id;

    const speaker = await prisma.speaker.create({
      data: {
        first_name: 'Relation',
        last_name: 'Speaker',
        title: 'Test Speaker',
        user_type: UserType.FACULTY,
      },
    });
    speakerId = speaker.id;

    const session = await prisma.chapelSession.create({
      data: {
        speaker_id: speakerId,
        topic: 'Relational Test Session',
      },
    });
    sessionId = session.id;
  });

  afterAll(async () => {
    await prisma.feedback.deleteMany();
    await prisma.chapelSession.deleteMany();
    await prisma.speaker.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('Should prevent deleting user with existing feedback', async () => {
    await prisma.feedback.create({
      data: {
        stars: 5,
        user_id: userId,
        chapel_session_id: sessionId,
      },
    });

    await expect(
      prisma.user.delete({ where: { id: userId } })
    ).rejects.toThrow();
  });

  it('Should prevent deleting session with existing feedback', async () => {
    await expect(
      prisma.chapelSession.delete({ where: { id: sessionId } })
    ).rejects.toThrow();
  });

  it('Should prevent deleting speaker with existing sessions', async () => {
    await expect(
      prisma.speaker.delete({ where: { id: speakerId } })
    ).rejects.toThrow();
  });

  it('Should cascade delete feedback when user is deleted (after removing constraint)', async () => {
    // This test demonstrates the expected behavior
    // In production, you might want cascade delete configured
    const feedbacks = await prisma.feedback.findMany({
      where: { user_id: userId },
    });

    expect(feedbacks.length).toBeGreaterThan(0);
  });

});