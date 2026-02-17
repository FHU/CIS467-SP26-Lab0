import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import {prisma} from "../lib/prisma.js";
import { dropData } from "./setup.js";
import app from "../app.js";

describe('GET /api/tasks', () => {
  beforeEach(async () => {
    await dropData();
  });

  it('should return an empty array when there are no tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return all tasks', async () => {
    // arrange - seeding the database
    await prisma.task.createMany({
      data: [
        { title: 'Task 1' },
        { title: 'Task 2' },
      ],
    });

    // act
    const response = await request(app).get('/api/tasks');

    // assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].title).toBe('Task 1');
    expect(response.body[1].title).toBe('Task 2');
  });
});