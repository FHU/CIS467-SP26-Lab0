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

describe("Speaker API (Integration Tests)", () => {

  // ---------------------------------------
  // GET ALL SPEAKERS
  // ---------------------------------------
  it("GET /api/speakers - should return all speakers", async () => {
    const res = await request(app).get("/api/speakers");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);

    expect(res.body[0]).toHaveProperty("first_name");
    expect(res.body[0]).toHaveProperty("last_name");
    expect(res.body[0]).toHaveProperty("bio");
  });

  // ---------------------------------------
  // GET SPEAKER BY ID (seeded data)
  // ---------------------------------------
  it("GET /api/speakers/:id - should return seeded speaker", async () => {
    // find seeded speaker
    const seededSpeaker = await prisma.speaker.findFirst({
      where: { first_name: "David" },
    });

    const res = await request(app).get(`/api/speakers/${seededSpeaker!.id}`);

    expect(res.status).toBe(200);
    expect(res.body.first_name).toBe("David");
    expect(res.body.last_name).toBe("Shannon");
  });

  it("GET /api/speakers/:id - should return 404 if speaker not found", async () => {
    const res = await request(app).get("/api/speakers/999999");

    expect(res.status).toBe(404);
  });

  // ---------------------------------------
  // CREATE SPEAKER
  // ---------------------------------------
  it("POST /api/speakers - should create a speaker", async () => {
    const res = await request(app)
      .post("/api/speakers")
      .send({
        bio: "Test Speaker Bio",
        first_name: "Test",
        last_name: "Speaker",
        title: "Pastor",
      });

    expect(res.status).toBe(201);
    expect(res.body.first_name).toBe("Test");
    expect(res.body.last_name).toBe("Speaker");
  });

  // ---------------------------------------
  // UPDATE SPEAKER
  // ---------------------------------------
  it("PATCH /api/speakers/:id - should update speaker", async () => {
    const seededSpeaker = await prisma.speaker.findFirst({
      where: { first_name: "Kenan" },
    });

    const res = await request(app)
      .patch(`/api/speakers/${seededSpeaker!.id}`)
      .send({
        bio: "Updated Bio",
      });

    expect(res.status).toBe(200);
    expect(res.body.bio).toBe("Updated Bio");
  });

  it("PATCH /api/speakers/:id - should return 404 if speaker not found", async () => {
    const res = await request(app)
      .patch("/api/speakers/999999")
      .send({ bio: "Ghost" });

    expect(res.status).toBe(404);
  });

  // ---------------------------------------
  // DELETE SPEAKER
  // ---------------------------------------
  it("DELETE /api/speakers/:id - should delete speaker", async () => {
    // create temp speaker
    const speaker = await prisma.speaker.create({
      data: {
        bio: "Delete me",
        first_name: "Delete",
        last_name: "Speaker",
        title: "Temp",
      },
    });

    const res = await request(app).delete(`/api/speakers/${speaker.id}`);

    expect(res.status).toBe(204);

    const deleted = await prisma.speaker.findUnique({
      where: { id: speaker.id },
    });

    expect(deleted).toBeNull();
  });

  it("DELETE /api/speakers/:id - should return 404 if speaker not found", async () => {
    const res = await request(app).delete("/api/speakers/999999");

    expect(res.status).toBe(404);
  });

});
