import { describe, it, expect } from "vitest";
import request from "supertest";
import { setupTestEnvironment } from "./setup.js";
import { createUser } from "./helpers.js";
import app from "../app.js";

// 🔧 Setup: Clear DB → Connect → Test → Disconnect → Clear
setupTestEnvironment();

describe("GET /api/users", () => {
  it("should return empty array when no users exist", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return all users", async () => {
    await createUser({ name: "Alice", email: "alice@test.com" });
    await createUser({ name: "Bob", email: "bob@test.com" });

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/api/users").send({
      name: "John Doe",
      email: "john@test.com",
      userType: "STUDENT",
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("john@test.com");
    expect(response.body.userType).toBe("STUDENT");
  });

  it("should fail with duplicate email", async () => {
    await createUser({ email: "duplicate@test.com" });

    const response = await request(app).post("/api/users").send({
      name: "Another User",
      email: "duplicate@test.com",
      userType: "STUDENT",
    });

    // Should fail due to unique constraint
    expect([400, 409, 422, 500]).toContain(response.status);
  });

  it("should create user with different userTypes", async () => {
    const admin = await request(app).post("/api/users").send({
      name: "Admin User",
      email: "admin@test.com",
      userType: "ADMIN",
    });

    const staff = await request(app).post("/api/users").send({
      name: "Staff User",
      email: "staff@test.com",
      userType: "STAFF",
    });

    expect(admin.body.userType).toBe("ADMIN");
    expect(staff.body.userType).toBe("STAFF");
  });
});

describe("GET /api/users/:id", () => {
  it("should return user by id", async () => {
    const user = await createUser({ name: "Test User" });

    const response = await request(app).get(`/api/users/${user.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user.id);
    expect(response.body.name).toBe("Test User");
  });

  it("should return 404 for non-existent user", async () => {
    const response = await request(app).get("/api/users/99999");

    expect(response.status).toBe(404);
  });
});

describe("PUT /api/users/:id", () => {
  it("should update user", async () => {
    const user = await createUser({ name: "Old Name" });

    const response = await request(app)
      .put(`/api/users/${user.id}`)
      .send({ name: "New Name" });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("New Name");
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete user", async () => {
    const user = await createUser();

    const response = await request(app).delete(`/api/users/${user.id}`);

    expect(response.status).toBe(204);

    // Verify deletion
    const checkResponse = await request(app).get(`/api/users/${user.id}`);
    expect(checkResponse.status).toBe(404);
  });
});
