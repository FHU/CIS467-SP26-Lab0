import { describe, it, expect } from "vitest";
import request from "supertest";
import { setupTestEnvironment } from "./setup.js";
import { createSpeaker, createChapelSession } from "./helpers.js";
import app from "../app.js";

// 🔧 Setup: Clear DB → Connect → Test → Disconnect → Clear
setupTestEnvironment();

describe("GET /api/speakers", () => {
  it("should return empty array when no speakers exist", async () => {
    const response = await request(app).get("/api/speakers");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return all speakers", async () => {
    await createSpeaker({ name: "Pastor John" });
    await createSpeaker({ name: "Pastor Mary" });

    const response = await request(app).get("/api/speakers");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should return speakers with their chapel sessions", async () => {
    const speaker = await createSpeaker({ name: "Pastor Mike" });
    await createChapelSession({
      title: "Session 1",
      speakerId: speaker.id,
    });
    await createChapelSession({
      title: "Session 2",
      speakerId: speaker.id,
    });

    const response = await request(app).get("/api/speakers");

    expect(response.status).toBe(200);
    const foundSpeaker = response.body.find(
      (s: any) => s.id === speaker.id
    );
    expect(foundSpeaker.chapelSessions.length).toBe(2);
  });
});

describe("POST /api/speakers", () => {
  it("should create a new speaker", async () => {
    const response = await request(app).post("/api/speakers").send({
      name: "Pastor David",
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Pastor David");
    expect(response.body.id).toBeDefined();
  });

  it("should fail without name", async () => {
    const response = await request(app).post("/api/speakers").send({});

    expect([400, 422, 500]).toContain(response.status);
  });
});

describe("GET /api/speakers/:id", () => {
  it("should return speaker by id", async () => {
    const speaker = await createSpeaker({ name: "Pastor Sarah" });

    const response = await request(app).get(`/api/speakers/${speaker.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(speaker.id);
    expect(response.body.name).toBe("Pastor Sarah");
  });

  it("should return 404 for non-existent speaker", async () => {
    const response = await request(app).get("/api/speakers/99999");

    expect(response.status).toBe(404);
  });

  it("should include chapel sessions in speaker details", async () => {
    const speaker = await createSpeaker({ name: "Pastor Tom" });
    await createChapelSession({
      title: "Morning Service",
      speakerId: speaker.id,
    });

    const response = await request(app).get(`/api/speakers/${speaker.id}`);

    expect(response.status).toBe(200);
    expect(response.body.chapelSessions).toBeDefined();
    expect(response.body.chapelSessions.length).toBe(1);
    expect(response.body.chapelSessions[0].title).toBe("Morning Service");
  });
});

describe("PUT /api/speakers/:id", () => {
  it("should update speaker name", async () => {
    const speaker = await createSpeaker({ name: "Old Name" });

    const response = await request(app)
      .put(`/api/speakers/${speaker.id}`)
      .send({ name: "New Name" });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("New Name");
  });
});

describe("DELETE /api/speakers/:id", () => {
  it("should delete speaker without sessions", async () => {
    const speaker = await createSpeaker();

    const response = await request(app).delete(`/api/speakers/${speaker.id}`);

    expect(response.status).toBe(204);

    // Verify deletion
    const checkResponse = await request(app).get(`/api/speakers/${speaker.id}`);
    expect(checkResponse.status).toBe(404);
  });

  it("should handle deletion of speaker with sessions", async () => {
    const speaker = await createSpeaker();
    await createChapelSession({ speakerId: speaker.id });

    const response = await request(app).delete(`/api/speakers/${speaker.id}`);

    // Behavior depends on your cascade rules
    // Either succeeds with cascade delete, or fails with 400/409
    expect([204, 400, 409]).toContain(response.status);
  });
});
