import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";

import {prisma} from "../lib/prisma.js";
import { dropData } from "./setup.js";
import app from "../app.js";



beforeEach(async () => {
  await dropData();
});



describe("GET /api/users", () => {

  it("should return empty array when no users exist", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return all users", async () => {
    await prisma.user.createMany({
      data: [
        {
          name: "Alice",
          email: "alice@test.com",
          userType: "STUDENT",
        },
        {
          name: "Bob",
          email: "bob@test.com",
          userType: "STAFF",
        },
      ],
    });

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe("Alice");
    expect(response.body[1].name).toBe("Bob");
  });

});


describe("POST /api/users", () => {

  it("should create a new user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        name: "Charlie",
        email: "charlie@test.com",
        userType: "ADMIN",
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Charlie");
    expect(response.body.email).toBe("charlie@test.com");
    expect(response.body.userType).toBe("ADMIN");
  });

});
