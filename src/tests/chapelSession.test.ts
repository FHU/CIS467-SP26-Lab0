import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../lib/prisma.js";
import {setup} from "../tests/setup.js"
/*
  IMPORTANT:
  - beforeAll and afterAll are OUTSIDE describe (as requested)
  - Assumes seed already inserted sessions with id 5 and 12
*/

beforeAll(async () => {
  // Ensure DB is connected before tests
  await prisma.$connect();
  setup()
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("ChapelSession Controller", () => {

  // ========================
  // GET ALL
  // ========================
  it("should return all chapel sessions including speaker", async () => {
    const res = await request(app).get("/api/chapelsessions");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // should include speaker relation
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("speaker");
    }
  });

  // ========================
  // GET BY ID
  // ========================
  it("should return chapel session by id", async () => {
    const res = await request(app).get("/api/chapelsessions/5");

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(5);
    expect(res.body.topic).toBe("Love one another");
  });

  it("should return 404 if chapel session not found", async () => {
    const res = await request(app).get("/api/chapelsessions/9999");

    expect(res.status).toBe(404);
  });

  // ========================
  // CREATE
  // ========================
  it("should create a new chapel session", async () => {
    const newSession = {
      speaker_id: 1,
      topic: "Testing Session",
      scripture: "John 3:16",
      date: new Date("2025-10-10"),
      end_time: new Date("2025-10-10T11:00:00"),
      number_standing: 1
    };

    const res = await request(app)
      .post("/api/chapelsessions")
      .send(newSession);

    expect(res.status).toBe(201);
    expect(res.body.topic).toBe("Testing Session");
    expect(res.body).toHaveProperty("id");
  });

  // ========================
  // UPDATE
  // ========================
  it("should update a chapel session", async () => {
    const res = await request(app)
      .patch("/api/chapelsessions/5")
      .send({ topic: "Updated Topic" });

    expect(res.status).toBe(200);
    expect(res.body.topic).toBe("Updated Topic");
  });

  it("should return 404 when updating non-existing session", async () => {
    const res = await request(app)
      .patch("/api/chapelsessions/9999")
      .send({ topic: "Does not exist" });

    expect(res.status).toBe(404);
  });

  // ========================
  // DELETE
  // ========================
  it("should delete a chapel session", async () => {
    // First create one to delete
    const createRes = await request(app)
      .post("/api/chapelsessions")
      .send({
        speaker_id: 1,
        topic: "Delete Me",
        scripture: "Psalm 23",
        date: new Date("2025-12-12"),
        end_time: new Date("2025-12-12T11:00:00"),
        number_standing: 0
      });

    const id = createRes.body.id;

    const deleteRes = await request(app)
      .delete(`/api/chapelsessions/${id}`);

    expect(deleteRes.status).toBe(204);
  });

  it("should return 404 when deleting non-existing session", async () => {
    const res = await request(app)
      .delete("/api/chapelsessions/9999");

    expect(res.status).toBe(404);
  });

});
