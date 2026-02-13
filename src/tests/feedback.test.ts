import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js"; // adjust path if needed
import { prisma } from "../lib/prisma.js";
import {setup} from "../tests/setup.js"

beforeAll(async () => {
  await prisma.$connect();
  setup()
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Feedback API (Integration Tests)", () => {
  // ---------------------------------------
  // GET ALL
  // ---------------------------------------
  it("GET /api/feedback - should return all feedback with nested speaker", async () => {
    const res = await request(app).get("/api/feedback");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);

    const feedback = res.body[0];

    expect(feedback).toHaveProperty("user");
    expect(feedback).toHaveProperty("chapelSession");
    expect(feedback.chapelSession).toHaveProperty("speaker");
  });

  // ---------------------------------------
  // GET BY ID
  // ---------------------------------------
  it("GET /api/feedback/1 - should return seeded feedback", async () => {
    const res = await request(app).get("/api/feedback/1");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.response).toBe("Great Chapel!");
  });

  it("GET /api/feedback/9999 - should return 404", async () => {
    const res = await request(app).get("/api/feedback/9999");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Feedback not found");
  });

  // ---------------------------------------
  // CREATE
  // ---------------------------------------
  it("POST /api/feedback - should create feedback", async () => {
    const user = await prisma.user.findFirst();
    const session = await prisma.chapelSession.findFirst();

    const res = await request(app).post("/api/feedback").send({
      stars: 5,
      response: "Amazing chapel!",
      user_id: user!.id,
      chapel_session_id: session!.id,
    });

    expect(res.status).toBe(201);
    expect(res.body.stars).toBe(5);
    expect(res.body.response).toBe("Amazing chapel!");
  });

  // ---------------------------------------
  // UPDATE
  // ---------------------------------------
  it("PATCH /api/feedback/1 - should update feedback", async () => {
    const res = await request(app).patch("/api/feedback/1").send({ stars: 3 });

    expect(res.status).toBe(200);
    expect(res.body.stars).toBe(3);
  });

  it("PATCH /api/feedback/9999 - should return 404", async () => {
    const res = await request(app)
      .patch("/api/feedback/9999")
      .send({ stars: 1 });

    expect(res.status).toBe(404);
  });

  // ---------------------------------------
  // DELETE
  // ---------------------------------------
  it("DELETE /api/feedback/:id - should delete feedback", async () => {
    const user = await prisma.user.findFirst();
    const session = await prisma.chapelSession.findFirst();

    const feedback = await prisma.feedback.create({
      data: {
        stars: 1,
        response: "Temporary",
        user_id: user!.id,
        chapel_session_id: session!.id,
      },
    });

    const res = await request(app).delete(`/api/feedback/${feedback.id}`);

    expect(res.status).toBe(204);
  });
});
