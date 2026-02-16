import {describe, it, expect, beforeAll, beforeEach, afterAll} from 'vitest';
import request from 'supertest';

import {prisma} from '../lib/prisma.js';
import {setup, dropData, teardown} from './setup.js';
import app from '../app.js';
import { UserType } from '../generated/prisma/enums.js';



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