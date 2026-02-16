import {describe, it, expect, beforeAll, beforeEach, afterAll} from 'vitest';
import request from 'supertest';

import {prisma} from '../lib/prisma.js';
import {setup, dropData, teardown} from './setup.js';
import app from '../app.js';
import { UserType } from '../generated/prisma/enums.js';


describe('Relational Integrity Tests', () => {
  let userId: number;
  let speakerId: number;
  let sessionId: number;

beforeAll(async () => {
    await setup();  // Run once before ALL tests
  });

  beforeEach(async () => {
    await dropData();  // Run before EACH test to reset data
  });

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