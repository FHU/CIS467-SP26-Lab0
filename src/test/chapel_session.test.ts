import {describe, it, expect, beforeAll, beforeEach, afterAll} from 'vitest';
import request from 'supertest';

import {prisma} from '../lib/prisma.js';
import {setup, dropData, teardown} from './setup.js';
import app from '../app.js';
import { UserType } from '../generated/prisma/enums.js';

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
