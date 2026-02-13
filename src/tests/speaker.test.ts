import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";
import {prisma} from "../lib/prisma.js";
import { dropData } from "./setup.js";
import app from "../app.js";


beforeEach(async () => {
  await dropData();
});



describe("GET /api/speakers", () => {
  it("01 - should return empty array when none exist", async () => {
    const response = await request(app).get("/api/speakers");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("02 - should return all speakers", async () => {
    await prisma.speaker.createMany({
      data: [
        { name: "Speaker One" },
        { name: "Speaker Two" },
      ],
    });

    const response = await request(app).get("/api/speakers");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe("Speaker One");
    expect(response.body[1].name).toBe("Speaker Two");
  });
});

describe("POST /api/speakers", () => {
  it("should create a new speaker", async () => {
    const response = await request(app)
      .post("/api/speakers")
      .send({
        name: "New Speaker",
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("New Speaker");
  });
});