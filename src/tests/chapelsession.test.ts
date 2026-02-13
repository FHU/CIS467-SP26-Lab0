import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";

import {prisma} from "../lib/prisma.js";
import { dropData, } from "./setup.js";
import app from "../app.js";



beforeEach(async () => {
  await dropData();
});

describe("GET /api/chapel-sessions", () => {

  it("should return empty array when none exist", async () => {
    const response = await request(app).get("/api/chapel-sessions");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return sessions including speaker", async () => {

    const speaker = await prisma.speaker.create({
      data: { name: "Pastor John" },
    });

    await prisma.chapelSession.create({
      data: {
        title: "Morning Chapel",
        date: new Date(),
        speakerId: speaker.id,
      },
    });

    const response = await request(app).get("/api/chapel-sessions");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("Morning Chapel");
    expect(response.body[0].speaker.name).toBe("Pastor John");
  });

});
describe("POST /api/chapel-sessions", () => {

  it("should create session without speaker", async () => {
  const response = await request(app)
    .post("/api/chapel-sessions")
    .send({
      title: "No Speaker Yet",
      date: new Date().toISOString(), // ✅ REQUIRED
    });

  expect(response.status).toBe(201);
  expect(response.body.title).toBe("No Speaker Yet");
  expect(response.body.speakerId).toBeNull();
});

  it("should create session with speaker", async () => {

    const speaker = await prisma.speaker.create({
      data: { name: "Guest Speaker" },
    });

    const response = await request(app)
  .post("/api/chapel-sessions")
  .send({
    title: "Special Event",
    date: new Date().toISOString(), // ✅ REQUIRED
    speakerId: speaker.id,
  });


    expect(response.status).toBe(201);
    expect(response.body.speakerId).toBe(speaker.id);
  });

});
