import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";

import { prisma } from "../lib/prisma.js";
import { setup, dropData, tearDown } from "./setup.js";
import app from "../app.js";

beforeAll(async () => {
  await setup();
});

beforeEach(async () => {
  await dropData();
});

afterAll(async () => {
  await tearDown();
});

describe("GET /api/chapel-sessions", () => {
  it("Should return an empty array when no chapel sessions exist.", async () => {
    const response = await request(app).get("/api/chapel-sessions");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Should return all chapel sessions.", async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: "John",
        last_name: "Doe",
        bio: "Speaker bio",
        title: "Pastor",
        type: "FACULTY",
      },
    });

    await prisma.chapelSession.createMany({
      data: [
        {
          speaker_id: speaker.id,
          topic: "Faith and Prayer",
          scripture: "Matthew 6:9-13",
          date: new Date("2024-03-15T10:00:00Z"),
          end_time: new Date("2024-03-15T11:00:00Z"),
          number_standings: 150,
        },
        {
          speaker_id: speaker.id,
          topic: "Grace and Mercy",
          scripture: "Ephesians 2:8-9",
          date: new Date("2024-03-20T10:00:00Z"),
          end_time: new Date("2024-03-20T11:00:00Z"),
          number_standings: 200,
        },
      ],
    });

    const response = await request(app).get("/api/chapel-sessions");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("topic", "Faith and Prayer");
    expect(response.body[0]).toHaveProperty("scripture", "Matthew 6:9-13");
    expect(response.body[0]).toHaveProperty("number_standings", 150);
    expect(response.body[1]).toHaveProperty("topic", "Grace and Mercy");
    expect(response.body[1]).toHaveProperty("scripture", "Ephesians 2:8-9");
    expect(response.body[1]).toHaveProperty("number_standings", 200);
  });
});

describe("GET /api/chapel-sessions/:id", () => {
  it("Should return a single chapel session by id.", async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: "Jane",
        last_name: "Smith",
        bio: "Speaker bio",
        title: "Evangelist",
        type: "GUEST",
      },
    });

    const created = await prisma.chapelSession.create({
      data: {
        speaker_id: speaker.id,
        topic: "Love and Compassion",
        scripture: "1 Corinthians 13:4-7",
        date: new Date("2024-03-25T10:00:00Z"),
        end_time: new Date("2024-03-25T11:00:00Z"),
        number_standings: 180,
      },
    });

    const response = await request(app).get(`/api/chapel-sessions/${created.id}`);

    expect(response.status).toBe(200);
    expect(response.body.topic).toBe("Love and Compassion");
    expect(response.body.scripture).toBe("1 Corinthians 13:4-7");
    expect(response.body.number_standings).toBe(180);
    expect(response.body.speaker_id).toBe(speaker.id);
  });

  it("Should return 404 when chapel session not found.", async () => {
    const response = await request(app).get("/api/chapel-sessions/99999");
    expect(response.status).toBe(404);
  });

  it("Should include speaker information when requested.", async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: "Bob",
        last_name: "Johnson",
        bio: "Speaker bio",
        title: "Professor",
        type: "FACULTY",
      },
    });

    const created = await prisma.chapelSession.create({
      data: {
        speaker_id: speaker.id,
        topic: "Hope",
        scripture: "Romans 15:13",
        date: new Date("2024-03-30T10:00:00Z"),
        end_time: new Date("2024-03-30T11:00:00Z"),
        number_standings: 175,
      },
    });

    const response = await request(app).get(`/api/chapel-sessions/${created.id}?include=speaker`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("speaker");
    expect(response.body.speaker.first_name).toBe("Bob");
    expect(response.body.speaker.last_name).toBe("Johnson");
  });
});

describe("POST /api/chapel-sessions", () => {
  it("Should create a new chapel session with valid data.", async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: "Alice",
        last_name: "Brown",
        bio: "Speaker bio",
        title: "Dean",
        type: "FACULTY",
      },
    });

    const newSession = {
      speaker_id: speaker.id,
      topic: "Forgiveness",
      scripture: "Matthew 18:21-22",
      date: "2024-04-05T10:00:00Z",
      end_time: "2024-04-05T11:00:00Z",
      number_standings: 160,
    };

    const response = await request(app).post("/api/chapel-sessions").send(newSession);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.topic).toBe(newSession.topic);
    expect(response.body.scripture).toBe(newSession.scripture);
    expect(response.body.speaker_id).toBe(speaker.id);
    expect(response.body.number_standings).toBe(160);
  });

  it("Should return 400 when creating chapel session with invalid speaker_id.", async () => {
    const response = await request(app)
      .post("/api/chapel-sessions")
      .send({
        speaker_id: 99999,
        topic: "Topic",
        scripture: "Scripture",
        date: "2024-04-10T10:00:00Z",
        end_time: "2024-04-10T11:00:00Z",
        number_standings: 100,
      });

    expect(response.status).toBe(400);
  });

  it("Should return 400 when creating chapel session without required fields.", async () => {
    const response = await request(app)
      .post("/api/chapel-sessions")
      .send({
        topic: "Incomplete Session",
      });

    expect(response.status).toBe(400);
  });

  it("Should return 400 when end_time is before date.", async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: "Test",
        last_name: "Speaker",
        bio: "Bio",
        title: "Title",
        type: "FACULTY",
      },
    });

    const response = await request(app)
      .post("/api/chapel-sessions")
      .send({
        speaker_id: speaker.id,
        topic: "Invalid Times",
        scripture: "Scripture",
        date: "2024-04-15T11:00:00Z",
        end_time: "2024-04-15T10:00:00Z",
        number_standings: 100,
      });

    expect(response.status).toBe(400);
  });
});

describe("PATCH /api/chapel-sessions/:id", () => {
  it("Should update chapel session information.", async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: "Speaker",
        last_name: "One",
        bio: "Bio",
        title: "Title",
        type: "FACULTY",
      },
    });

    const created = await prisma.chapelSession.create({
      data: {
        speaker_id: speaker.id,
        topic: "Old Topic",
        scripture: "Old Scripture",
        date: new Date("2024-04-20T10:00:00Z"),
        end_time: new Date("2024-04-20T11:00:00Z"),
        number_standings: 150,
      },
    });

    const response = await request(app)
      .patch(`/api/chapel-sessions/${created.id}`)
      .send({
        topic: "Updated Topic",
        scripture: "Updated Scripture",
        number_standings: 200,
      });

    expect(response.status).toBe(200);
    expect(response.body.topic).toBe("Updated Topic");
    expect(response.body.scripture).toBe("Updated Scripture");
    expect(response.body.number_standings).toBe(200);
  });

  it("Should update speaker for a chapel session.", async () => {
    const speaker1 = await prisma.speaker.create({
      data: {
        first_name: "Speaker",
        last_name: "One",
        bio: "Bio",
        title: "Title",
        type: "FACULTY",
      },
    });

    const speaker2 = await prisma.speaker.create({
      data: {
        first_name: "Speaker",
        last_name: "Two",
        bio: "Bio",
        title: "Title",
        type: "GUEST",
      },
    });

    const created = await prisma.chapelSession.create({
      data: {
        speaker_id: speaker1.id,
        topic: "Topic",
        scripture: "Scripture",
        date: new Date("2024-04-25T10:00:00Z"),
        end_time: new Date("2024-04-25T11:00:00Z"),
        number_standings: 150,
      },
    });

    const response = await request(app)
      .patch(`/api/chapel-sessions/${created.id}`)
      .send({
        speaker_id: speaker2.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.speaker_id).toBe(speaker2.id);
  });

  it("Should return 404 when updating non-existent chapel session.", async () => {
    const response = await request(app)
      .patch("/api/chapel-sessions/99999")
      .send({
        topic: "New Topic",
      });

    expect(response.status).toBe(404);
  });
});

describe("DELETE /api/chapel-sessions/:id", () => {
  it("Should delete a chapel session.", async () => {
    const speaker = await prisma.speaker.create({
      data: {
        first_name: "Delete",
        last_name: "Speaker",
        bio: "Bio",
        title: "Title",
        type: "FACULTY",
      },
    });

    const created = await prisma.chapelSession.create({
      data: {
        speaker_id: speaker.id,
        topic: "To Delete",
        scripture: "Scripture",
        date: new Date("2024-04-30T10:00:00Z"),
        end_time: new Date("2024-04-30T11:00:00Z"),
        number_standings: 100,
      },
    });

    const response = await request(app).delete(`/api/chapel-sessions/${created.id}`);

    expect(response.status).toBe(204);

    const deleted = await prisma.chapelSession.findUnique({
      where: { id: created.id },
    });

    expect(deleted).toBeNull();
  });

  it("Should return 404 when deleting non-existent chapel session.", async () => {
    const response = await request(app).delete("/api/chapel-sessions/99999");
    expect(response.status).toBe(404);
  });
});