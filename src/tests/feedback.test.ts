import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";
import {prisma} from "../lib/prisma.js";
import {  dropData,} from "./setup.js";
import app from "../app.js";



beforeEach(async () => {
  await dropData();
});


describe("GET /api/feedback", () => {
  it("should return empty array when no feedback exists", async () => {
    const response = await request(app).get("/api/feedback");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return feedback with author and chapelSession", async () => {
    // 🧱 Arrange (create required relational data)
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

    const response = await request(app)
      .post("/api/feedback")
      .send({
        title: "Loved it",
        content: "Amazing session",
        authorId: user.id,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Loved it");
    expect(response.body.authorId).toBe(user.id);
  });
});