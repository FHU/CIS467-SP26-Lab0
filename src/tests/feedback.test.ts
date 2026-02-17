import { describe, it, expect } from "vitest";
import request from "supertest";
import { prisma } from "../lib/prisma.js";
import { setupTestEnvironment } from "./setup.js";
import app from "../app.js";

// 🔧 Setup: Clear DB → Connect → Test → Disconnect → Clear
setupTestEnvironment();

describe("GET /api/feedback", () => {
  it("should return empty array when no feedback exists", async () => {
    const response = await request(app).get("/api/feedback");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return feedback with author and chapelSession", async () => {
    // 🧱 Arrange
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@test.com",
        userType: "STUDENT",
      },
    });

    const speaker = await prisma.speaker.create({
      data: {
        name: "Pastor Mike",
      },
    });

    const chapelSession = await prisma.chapelSession.create({
      data: {
        title: "Weekly Chapel",
        date: new Date(),
        speakerId: speaker.id,
      },
    });

    await prisma.feedback.create({
      data: {
        title: "Great message",
        content: "Very inspiring.",
        authorId: user.id,
        chapelSessionId: chapelSession.id,
      },
    });

    // 🎬 Act
    const response = await request(app).get("/api/feedback");

    // ✅ Assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("Great message");
    expect(response.body[0].author.name).toBe("John Doe");
    expect(response.body[0].chapelSession.title).toBe("Weekly Chapel");
    expect(response.body[0].chapelSession.speaker.name).toBe("Pastor Mike");
  });

  it("should return multiple feedback entries", async () => {
    // Create first feedback
    const user1 = await prisma.user.create({
      data: { name: "Alice", email: "alice@test.com", userType: "STUDENT" },
    });
    const speaker1 = await prisma.speaker.create({
      data: { name: "Speaker 1" },
    });
    const session1 = await prisma.chapelSession.create({
      data: { title: "Session 1", date: new Date(), speakerId: speaker1.id },
    });
    await prisma.feedback.create({
      data: {
        title: "Feedback 1",
        content: "Content 1",
        authorId: user1.id,
        chapelSessionId: session1.id,
      },
    });

    // Create second feedback
    const user2 = await prisma.user.create({
      data: { name: "Bob", email: "bob@test.com", userType: "STUDENT" },
    });
    const session2 = await prisma.chapelSession.create({
      data: { title: "Session 2", date: new Date(), speakerId: speaker1.id },
    });
    await prisma.feedback.create({
      data: {
        title: "Feedback 2",
        content: "Content 2",
        authorId: user2.id,
        chapelSessionId: session2.id,
      },
    });

    const response = await request(app).get("/api/feedback");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

describe("POST /api/feedback", () => {
  it("should create new feedback", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Jane",
        email: "jane@test.com",
        userType: "STUDENT",
      },
    });

    const speaker = await prisma.speaker.create({
      data: { name: "Speaker Jane" },
    });

    const chapelSession = await prisma.chapelSession.create({
      data: {
        title: "Test Session",
        date: new Date(),
        speakerId: speaker.id,
      },
    });

    const response = await request(app)
      .post("/api/feedback")
      .send({
        title: "Loved it",
        content: "Amazing session",
        authorId: user.id,
        chapelSessionId: chapelSession.id,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Loved it");
    expect(response.body.authorId).toBe(user.id);
    expect(response.body.chapelSessionId).toBe(chapelSession.id);
  });

  it("should fail without required authorId", async () => {
    const response = await request(app)
      .post("/api/feedback")
      .send({
        title: "Missing author",
        content: "This should fail",
      });

    // Adjust expected status based on your API error handling
    expect([400, 422, 500]).toContain(response.status);
  });
});

describe("GET /api/feedback/:id", () => {
  it("should return specific feedback by id", async () => {
    const user = await prisma.user.create({
      data: { name: "Test", email: "test@test.com", userType: "STUDENT" },
    });
    const speaker = await prisma.speaker.create({
      data: { name: "Speaker" },
    });
    const session = await prisma.chapelSession.create({
      data: { title: "Session", date: new Date(), speakerId: speaker.id },
    });
    const feedback = await prisma.feedback.create({
      data: {
        title: "Test Feedback",
        content: "Test content",
        authorId: user.id,
        chapelSessionId: session.id,
      },
    });

    const response = await request(app).get(`/api/feedback/${feedback.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(feedback.id);
    expect(response.body.title).toBe("Test Feedback");
  });

  it("should return 404 for non-existent feedback", async () => {
    const response = await request(app).get("/api/feedback/99999");

    expect(response.status).toBe(404);
  });
});

describe("PUT /api/feedback/:id", () => {
  it("should update existing feedback", async () => {
    const user = await prisma.user.create({
      data: { name: "User", email: "user@test.com", userType: "STUDENT" },
    });
    const speaker = await prisma.speaker.create({
      data: { name: "Speaker" },
    });
    const session = await prisma.chapelSession.create({
      data: { title: "Session", date: new Date(), speakerId: speaker.id },
    });
    const feedback = await prisma.feedback.create({
      data: {
        title: "Original",
        content: "Original content",
        authorId: user.id,
        chapelSessionId: session.id,
      },
    });

    const response = await request(app)
      .put(`/api/feedback/${feedback.id}`)
      .send({
        title: "Updated title",
        content: "Updated content",
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated title");
    expect(response.body.content).toBe("Updated content");
  });
});

describe("DELETE /api/feedback/:id", () => {
  it("should delete existing feedback", async () => {
    const user = await prisma.user.create({
      data: { name: "User", email: "user@test.com", userType: "STUDENT" },
    });
    const speaker = await prisma.speaker.create({
      data: { name: "Speaker" },
    });
    const session = await prisma.chapelSession.create({
      data: { title: "Session", date: new Date(), speakerId: speaker.id },
    });
    const feedback = await prisma.feedback.create({
      data: {
        title: "To Delete",
        content: "Will be deleted",
        authorId: user.id,
        chapelSessionId: session.id,
      },
    });

    const response = await request(app).delete(`/api/feedback/${feedback.id}`);

    expect(response.status).toBe(204);

    // Verify it's deleted
    const checkResponse = await request(app).get(`/api/feedback/${feedback.id}`);
    expect(checkResponse.status).toBe(404);
  });
});
