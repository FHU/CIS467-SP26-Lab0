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