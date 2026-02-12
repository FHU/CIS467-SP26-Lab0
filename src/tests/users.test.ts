import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";

import { prisma } from "../lib/prisma.js";
import { setup, dropData, tearDown } from "./setup.js";
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

describe("GET /api/users", () => {
  it("Should return an empty array when no users exist.", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Should return all users.", async () => {
    await prisma.user.createMany({
      data: [
        {
          email: "user1@example.com",
          first_name: "John",
          last_name: "Doe",
          user_type: "STUDENT",
        },
        {
          email: "user2@example.com",
          first_name: "Jane",
          last_name: "Smith",
          user_type: "FACULTY",
        },
      ],
    });

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("email", "user1@example.com");
    expect(response.body[0]).toHaveProperty("first_name", "John");
    expect(response.body[0]).toHaveProperty("last_name", "Doe");
    expect(response.body[0]).toHaveProperty("user_type", "STUDENT");
    expect(response.body[1]).toHaveProperty("email", "user2@example.com");
    expect(response.body[1]).toHaveProperty("first_name", "Jane");
    expect(response.body[1]).toHaveProperty("last_name", "Smith");
    expect(response.body[1]).toHaveProperty("user_type", "FACULTY");
  });
});

describe("GET /api/users/:id", () => {
  it("Should return a single user by id.", async () => {
    const created = await prisma.user.create({
      data: {
        email: "single@example.com",
        first_name: "Alice",
        last_name: "Johnson",
        user_type: "ALUMNI",
      },
    });

    const response = await request(app).get(`/api/users/${created.id}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe("single@example.com");
    expect(response.body.first_name).toBe("Alice");
    expect(response.body.last_name).toBe("Johnson");
    expect(response.body.user_type).toBe("ALUMNI");
  });

  it("Should return 404 when user not found.", async () => {
    const response = await request(app).get("/api/users/99999");
    expect(response.status).toBe(404);
  });
});

describe("POST /api/users", () => {
  it("Should create a new user with valid data.", async () => {
    const newUser = {
      email: "new@example.com",
      first_name: "Bob",
      last_name: "Brown",
      user_type: "STAFF",
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.first_name).toBe(newUser.first_name);
    expect(response.body.last_name).toBe(newUser.last_name);
    expect(response.body.user_type).toBe(newUser.user_type);
  });

  it("Should create users with different user types.", async () => {
    const userTypes = ["STUDENT", "FACULTY", "STAFF", "ALUMNI", "GUEST"];

    for (let i = 0; i < userTypes.length; i++) {
      const type = userTypes[i];
      const response = await request(app)
        .post("/api/users")
        .send({
          email: `${type.toLowerCase()}@example.com`,
          first_name: "Test",
          last_name: type,
          user_type: type,
        });

      expect(response.status).toBe(201);
      expect(response.body.user_type).toBe(type);
    }
  });

  it("Should return 400 when creating user with duplicate email.", async () => {
    const userData = {
      email: "duplicate@example.com",
      first_name: "First",
      last_name: "User",
      user_type: "STUDENT",
    };

    await request(app).post("/api/users").send(userData);
    const response = await request(app).post("/api/users").send(userData);

    expect(response.status).toBe(400);
  });

  it("Should return 400 when creating user with invalid user_type.", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        email: "invalid@example.com",
        first_name: "Invalid",
        last_name: "Type",
        user_type: "INVALID_TYPE",
      });

    expect(response.status).toBe(400);
  });

  it("Should return 400 when creating user without required fields.", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        email: "missing@example.com",
      });

    expect(response.status).toBe(400);
  });
});

describe("PUT /api/users/:id", () => {
  it("Should update user information.", async () => {
    const created = await prisma.user.create({
      data: {
        email: "update@example.com",
        first_name: "Old",
        last_name: "Name",
        user_type: "STUDENT",
      },
    });

    const response = await request(app)
      .put(`/api/users/${created.id}`)
      .send({
        first_name: "New",
        last_name: "UpdatedName",
      });

    expect(response.status).toBe(200);
    expect(response.body.first_name).toBe("New");
    expect(response.body.last_name).toBe("UpdatedName");
    expect(response.body.email).toBe("update@example.com");
  });

  it("Should update user type.", async () => {
    const created = await prisma.user.create({
      data: {
        email: "typechange@example.com",
        first_name: "Type",
        last_name: "Change",
        user_type: "STUDENT",
      },
    });

    const response = await request(app)
      .put(`/api/users/${created.id}`)
      .send({
        user_type: "ALUMNI",
      });

    expect(response.status).toBe(200);
    expect(response.body.user_type).toBe("ALUMNI");
  });

  it("Should return 400 when updating to duplicate email.", async () => {
    await prisma.user.create({
      data: {
        email: "existing@example.com",
        first_name: "Existing",
        last_name: "User",
        user_type: "STUDENT",
      },
    });

    const userToUpdate = await prisma.user.create({
      data: {
        email: "toupdate@example.com",
        first_name: "To",
        last_name: "Update",
        user_type: "FACULTY",
      },
    });

    const response = await request(app)
      .put(`/api/users/${userToUpdate.id}`)
      .send({
        email: "existing@example.com",
      });

    expect(response.status).toBe(400);
  });

  it("Should return 404 when updating non-existent user.", async () => {
    const response = await request(app)
      .put("/api/users/99999")
      .send({
        first_name: "New",
      });

    expect(response.status).toBe(404);
  });
});

describe("DELETE /api/users/:id", () => {
  it("Should delete a user.", async () => {
    const created = await prisma.user.create({
      data: {
        email: "delete@example.com",
        first_name: "Delete",
        last_name: "Me",
        user_type: "GUEST",
      },
    });

    const response = await request(app).delete(`/api/users/${created.id}`);

    expect(response.status).toBe(204);

    const deleted = await prisma.user.findUnique({
      where: { id: created.id },
    });

    expect(deleted).toBeNull();
  });

  it("Should return 404 when deleting non-existent user.", async () => {
    const response = await request(app).delete("/api/users/99999");
    expect(response.status).toBe(404);
  });
});