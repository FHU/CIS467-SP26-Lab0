import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js"; // adjust path if needed
import { prisma } from "../lib/prisma.js";
import {setup} from "../tests/setup.js"


// ✅ outside describe (your requirement)
beforeAll(async () => {
  await prisma.$connect();
  setup()
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("User API (Integration Tests)", () => {

  // ---------------------------------------
  // GET ALL USERS
  // ---------------------------------------
  it("GET /api/users - should return all users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);

    expect(res.body[0]).toHaveProperty("email");
    expect(res.body[0]).toHaveProperty("first_name");
    expect(res.body[0]).toHaveProperty("last_name");
  });

  // ---------------------------------------
  // GET USER BY ID
  // ---------------------------------------
  it("GET /api/users/:id - should return seeded user", async () => {
    // grab seeded user
    const seededUser = await prisma.user.findUnique({
      where: { email: "student1@gmail.com" },
    });

    const res = await request(app).get(`/api/users/${seededUser!.id}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("student1@gmail.com");
    expect(res.body.first_name).toBe("Robert");
    expect(res.body.last_name).toBe("Smith");
  });

  it("GET /api/users/:id - should return 404 if user not found", async () => {
    const res = await request(app).get("/api/users/999999");

    expect(res.status).toBe(404);
  });

  // ---------------------------------------
  // CREATE USER
  // ---------------------------------------
  it("POST /api/users - should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        email: "newuser@gmail.com",
        first_name: "New",
        last_name: "User",
        usertype: "STUDENT",
      });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("newuser@gmail.com");
    expect(res.body.first_name).toBe("New");
  });

  it("POST /api/users - should fail on duplicate email", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({
        email: "student1@gmail.com",
        first_name: "Duplicate",
        last_name: "User",
        usertype: "STUDENT",
      });

    // Prisma throws unique constraint → typically 500 unless handled
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  // ---------------------------------------
  // UPDATE USER
  // ---------------------------------------
  it("PATCH /api/users/:id - should update user", async () => {
    const seededUser = await prisma.user.findUnique({
      where: { email: "student2@gmail.com" },
    });

    const res = await request(app)
      .patch(`/api/users/${seededUser!.id}`)
      .send({
        first_name: "UpdatedName",
      });

    expect(res.status).toBe(200);
    expect(res.body.first_name).toBe("UpdatedName");
  });

  it("PATCH /api/users/:id - should return 404 if user not found", async () => {
    const res = await request(app)
      .patch("/api/users/999999")
      .send({ first_name: "Ghost" });

    expect(res.status).toBe(404);
  });

  // ---------------------------------------
  // DELETE USER
  // ---------------------------------------
  it("DELETE /api/users/:id - should delete user", async () => {
    // create temp user first
    const user = await prisma.user.create({
      data: {
        email: `delete_${Date.now()}@gmail.com`,
        first_name: "Delete",
        last_name: "Me",
        usertype: "STUDENT",
      },
    });

    const res = await request(app).delete(`/api/users/${user.id}`);

    expect(res.status).toBe(204);

    const deleted = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(deleted).toBeNull();
  });

  it("DELETE /api/users/:id - should return 404 if user not found", async () => {
    const res = await request(app).delete("/api/users/999999");

    expect(res.status).toBe(404);
  });

});
