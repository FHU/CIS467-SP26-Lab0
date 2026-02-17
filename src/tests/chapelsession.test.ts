import { describe, it, expect } from "vitest";
import request from "supertest";
import { setupTestEnvironment } from "./setup.js";
import { createSpeaker, createChapelSession, createFeedback } from "./helpers.js";
import app from "../app.js";

// 🔧 Setup: Clear DB → Connect → Test → Disconnect → Clear
setupTestEnvironment();

describe("GET /api/chapel-sessions", () => {
  it("should return empty array when no sessions exist", async () => {
    const response = await request(app).get("/api/chapel-sessions");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return all chapel sessions", async () => {
    await createChapelSession({ title: "Morning Chapel" });
    await createChapelSession({ title: "Evening Chapel" });

    const response = await request(app).get("/api/chapel-sessions");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should return sessions with speaker information", async () => {
    const speaker = await createSpeaker({ name: "Pastor Mike" });
    await createChapelSession({
      title: "Weekly Service",
      speakerId: speaker.id,
    });

    const response = await request(app).get("/api/chapel-sessions");

    expect(response.status).toBe(200);
    expect(response.body[0].speaker).toBeDefined();
    expect(response.body[0].speaker.name).toBe("Pastor Mike");
  });
});

describe("POST /api/chapel-sessions", () => {
  it("should create a new chapel session", async () => {
    const speaker = await createSpeaker({ name: "Pastor John" });

    const response = await request(app)
      .post("/api/chapel-sessions")
      .send({
        title: "New Chapel Session",
        date: new Date().toISOString(),
        speakerId: speaker.id,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("New Chapel Session");
    expect(response.body.speakerId).toBe(speaker.id);
  });

  it("should create session without speaker", async () => {
    const response = await request(app)
      .post("/api/chapel-sessions")
      .send({
        title: "Session Without Speaker",
        date: new Date().toISOString(),
      });

    expect(response.status).toBe(201);
    expect(response.body.speakerId).toBeNull();
  });

  it("should fail without required title", async () => {
    const response = await request(app)
      .post("/api/chapel-sessions")
      .send({
        date: new Date().toISOString(),
      });

    expect([400, 422, 500]).toContain(response.status);
  });
});

describe("GET /api/chapel-sessions/:id", () => {
  it("should return chapel session by id", async () => {
    const session = await createChapelSession({ title: "Test Session" });

    const response = await request(app).get(`/api/chapel-sessions/${session.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(session.id);
    expect(response.body.title).toBe("Test Session");
  });

  it("should return 404 for non-existent session", async () => {
    const response = await request(app).get("/api/chapel-sessions/99999");

    expect(response.status).toBe(404);
  });

  it("should include speaker and feedbacks in session details", async () => {
    const speaker = await createSpeaker({ name: "Pastor Sarah" });
    const session = await createChapelSession({
      title: "Detailed Session",
      speakerId: speaker.id,
    });
    await createFeedback({
      title: "Great!",
      chapelSessionId: session.id,
    });

    const response = await request(app).get(`/api/chapel-sessions/${session.id}`);

    expect(response.status).toBe(200);
    expect(response.body.speaker).toBeDefined();
    expect(response.body.speaker.name).toBe("Pastor Sarah");
    expect(response.body.feedbacks).toBeDefined();
    expect(response.body.feedbacks.length).toBe(1);
  });
});

describe("PUT /api/chapel-sessions/:id", () => {
  it("should update chapel session", async () => {
    const session = await createChapelSession({ title: "Old Title" });

    const response = await request(app)
      .put(`/api/chapel-sessions/${session.id}`)
      .send({
        title: "Updated Title",
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Title");
  });

  it("should update session speaker", async () => {
    const speaker1 = await createSpeaker({ name: "Speaker 1" });
    const speaker2 = await createSpeaker({ name: "Speaker 2" });
    const session = await createChapelSession({ speakerId: speaker1.id });

    const response = await request(app)
      .put(`/api/chapel-sessions/${session.id}`)
      .send({
        speakerId: speaker2.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.speakerId).toBe(speaker2.id);
  });
});

describe("DELETE /api/chapel-sessions/:id", () => {
  it("should delete chapel session without feedback", async () => {
    const session = await createChapelSession();

    const response = await request(app).delete(
      `/api/chapel-sessions/${session.id}`
    );

    expect(response.status).toBe(204);

    // Verify deletion
    const checkResponse = await request(app).get(
      `/api/chapel-sessions/${session.id}`
    );
    expect(checkResponse.status).toBe(404);
  });

  it("should handle deletion of session with feedback", async () => {
    const session = await createChapelSession();
    await createFeedback({ chapelSessionId: session.id });

    const response = await request(app).delete(
      `/api/chapel-sessions/${session.id}`
    );

    // Behavior depends on your cascade rules
    expect([204, 400, 409]).toContain(response.status);
  });
});
