// import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
// import request from "supertest";

// import { prisma } from "../lib/prisma.js";
// import { setup, dropData, tearDown } from "./setup.js";
// import app from "../app.js";

// beforeAll(async () => {
//   await setup();
// });

// beforeEach(async () => {
//   await dropData();
// });

// afterAll(async () => {
//   await tearDown();
// });

// describe("GET /api/speakers", () => {
//   it("Should return an empty array when no speakers exist.", async () => {
//     const response = await request(app).get("/api/speakers");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual([]);
//   });

//   it("Should return all speakers.", async () => {
//     await prisma.speaker.createMany({
//       data: [
//         {
//           first_name: "John",
//           last_name: "Doe",
//           bio: "Experienced speaker and educator",
//           title: "Professor of Theology",
//           type: "FACULTY",
//         },
//         {
//           first_name: "Jane",
//           last_name: "Smith",
//           bio: "Guest speaker from abroad",
//           title: "Pastor",
//           type: "GUEST",
//         },
//       ],
//     });

//     const response = await request(app).get("/api/speakers");

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveLength(2);
//     expect(response.body[0]).toHaveProperty("first_name", "John");
//     expect(response.body[0]).toHaveProperty("last_name", "Doe");
//     expect(response.body[0]).toHaveProperty("type", "FACULTY");
//     expect(response.body[1]).toHaveProperty("first_name", "Jane");
//     expect(response.body[1]).toHaveProperty("last_name", "Smith");
//     expect(response.body[1]).toHaveProperty("type", "GUEST");
//   });
// });

// describe("GET /api/speakers/:id", () => {
//   it("Should return a single speaker by id.", async () => {
//     const created = await prisma.speaker.create({
//       data: {
//         first_name: "Alice",
//         last_name: "Johnson",
//         bio: "Biblical scholar and author",
//         title: "Dean of Chapel",
//         type: "FACULTY",
//       },
//     });

//     const response = await request(app).get(`/api/speakers/${created.id}`);

//     expect(response.status).toBe(200);
//     expect(response.body.first_name).toBe("Alice");
//     expect(response.body.last_name).toBe("Johnson");
//     expect(response.body.bio).toBe("Biblical scholar and author");
//     expect(response.body.title).toBe("Dean of Chapel");
//     expect(response.body.type).toBe("FACULTY");
//   });

//   it("Should return 404 when speaker not found.", async () => {
//     const response = await request(app).get("/api/speakers/99999");
//     expect(response.status).toBe(404);
//   });
// });

// describe("POST /api/speakers", () => {
//   it("Should create a new speaker with valid data.", async () => {
//     const newSpeaker = {
//       first_name: "Bob",
//       last_name: "Brown",
//       bio: "Missionary and speaker",
//       title: "Missionary Director",
//       type: "GUEST",
//     };

//     const response = await request(app).post("/api/speakers").send(newSpeaker);

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("id");
//     expect(response.body.first_name).toBe(newSpeaker.first_name);
//     expect(response.body.last_name).toBe(newSpeaker.last_name);
//     expect(response.body.bio).toBe(newSpeaker.bio);
//     expect(response.body.title).toBe(newSpeaker.title);
//     expect(response.body.type).toBe(newSpeaker.type);
//   });

//   it("Should create speakers with different user types.", async () => {
//     const userTypes = ["STUDENT", "FACULTY", "STAFF", "ALUMNI", "GUEST"];

//     for (let i = 0; i < userTypes.length; i++) {
//       const type = userTypes[i];
//       const response = await request(app)
//         .post("/api/speakers")
//         .send({
//           first_name: "Speaker",
//           last_name: type,
//           bio: `${type} speaker biography`,
//           title: `${type} Title`,
//           type: type,
//         });

//       expect(response.status).toBe(201);
//       expect(response.body.type).toBe(type);
//     }
//   });

//   it("Should return 400 when creating speaker with invalid type.", async () => {
//     const response = await request(app)
//       .post("/api/speakers")
//       .send({
//         first_name: "Invalid",
//         last_name: "Type",
//         bio: "Bio",
//         title: "Title",
//         type: "INVALID_TYPE",
//       });

//     expect(response.status).toBe(400);
//   });

//   it("Should return 400 when creating speaker without required fields.", async () => {
//     const response = await request(app)
//       .post("/api/speakers")
//       .send({
//         first_name: "Missing",
//       });

//     expect(response.status).toBe(400);
//   });
// });

// describe("PUT /api/speakers/:id", () => {
//   it("Should update speaker information.", async () => {
//     const created = await prisma.speaker.create({
//       data: {
//         first_name: "Old",
//         last_name: "Name",
//         bio: "Old bio",
//         title: "Old title",
//         type: "FACULTY",
//       },
//     });

//     const response = await request(app)
//       .put(`/api/speakers/${created.id}`)
//       .send({
//         first_name: "New",
//         last_name: "Name",
//         bio: "Updated bio",
//       });

//     expect(response.status).toBe(200);
//     expect(response.body.first_name).toBe("New");
//     expect(response.body.bio).toBe("Updated bio");
//     expect(response.body.title).toBe("Old title");
//   });

//   it("Should update speaker type.", async () => {
//     const created = await prisma.speaker.create({
//       data: {
//         first_name: "Type",
//         last_name: "Change",
//         bio: "Bio",
//         title: "Title",
//         type: "STUDENT",
//       },
//     });

//     const response = await request(app)
//       .put(`/api/speakers/${created.id}`)
//       .send({
//         type: "ALUMNI",
//       });

//     expect(response.status).toBe(200);
//     expect(response.body.type).toBe("ALUMNI");
//   });

//   it("Should return 404 when updating non-existent speaker.", async () => {
//     const response = await request(app)
//       .put("/api/speakers/99999")
//       .send({
//         first_name: "New",
//       });

//     expect(response.status).toBe(404);
//   });
// });

// describe("DELETE /api/speakers/:id", () => {
//   it("Should delete a speaker.", async () => {
//     const created = await prisma.speaker.create({
//       data: {
//         first_name: "Delete",
//         last_name: "Me",
//         bio: "To be deleted",
//         title: "Title",
//         type: "GUEST",
//       },
//     });

//     const response = await request(app).delete(`/api/speakers/${created.id}`);

//     expect(response.status).toBe(204);

//     const deleted = await prisma.speaker.findUnique({
//       where: { id: created.id },
//     });

//     expect(deleted).toBeNull();
//   });

//   it("Should return 404 when deleting non-existent speaker.", async () => {
//     const response = await request(app).delete("/api/speakers/99999");
//     expect(response.status).toBe(404);
//   });
// });

// describe("Speaker filtering and relationships", () => {
//   beforeEach(async () => {
//     await prisma.speaker.createMany({
//       data: [
//         {
//           first_name: "Faculty",
//           last_name: "Speaker1",
//           bio: "Faculty bio",
//           title: "Professor",
//           type: "FACULTY",
//         },
//         {
//           first_name: "Guest",
//           last_name: "Speaker1",
//           bio: "Guest bio",
//           title: "Evangelist",
//           type: "GUEST",
//         },
//         {
//           first_name: "Faculty",
//           last_name: "Speaker2",
//           bio: "Another faculty bio",
//           title: "Dean",
//           type: "FACULTY",
//         },
//       ],
//     });
//   });

//   it("Should filter speakers by type.", async () => {
//     const response = await request(app).get("/api/speakers?type=FACULTY");

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveLength(2);
//     expect(response.body.every((speaker: any) => speaker.type === "FACULTY")).toBe(true);
//   });

//   it("Should search speakers by name.", async () => {
//     const response = await request(app).get("/api/speakers?search=Faculty");

//     expect(response.status).toBe(200);
//     expect(response.body.length).toBeGreaterThan(0);
//   });
// });