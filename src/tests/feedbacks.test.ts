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

// describe("GET /api/feedbacks", () => {
//   it("Should return an empty array when no feedbacks exist.", async () => {
//     const response = await request(app).get("/api/feedbacks");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual([]);
//   });

//   it("Should return all feedbacks.", async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "user@example.com",
//         first_name: "Test",
//         last_name: "User",
//         user_type: "STUDENT",
//       },
//     });

//     const speaker = await prisma.speaker.create({
//       data: {
//         first_name: "Speaker",
//         last_name: "Name",
//         bio: "Bio",
//         title: "Title",
//         type: "FACULTY",
//       },
//     });

//     const chapelSession = await prisma.chapelSession.create({
//       data: {
//         speaker_id: speaker.id,
//         topic: "Faith",
//         scripture: "Hebrews 11:1",
//         date: new Date("2024-05-01T10:00:00Z"),
//         end_time: new Date("2024-05-01T11:00:00Z"),
//         number_standings: 150,
//       },
//     });

//     await prisma.feedback.createMany({
//       data: [
//         {
//           stars: 5,
//           response: "Excellent message!",
//           user_id: user.id,
//           chapel_session_id: chapelSession.id,
//         },
//         {
//           stars: 4,
//           response: "Very inspiring.",
//           user_id: user.id,
//           chapel_session_id: chapelSession.id,
//         },
//       ],
//     });

//     const response = await request(app).get("/api/feedbacks");

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveLength(2);
//     expect(response.body[0]).toHaveProperty("stars", 5);
//     expect(response.body[0]).toHaveProperty("response", "Excellent message!");
//     expect(response.body[1]).toHaveProperty("stars", 4);
//     expect(response.body[1]).toHaveProperty("response", "Very inspiring.");
//   });
// });

// describe("GET /api/feedbacks/:id", () => {
//   it("Should return a single feedback by id.", async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "user@example.com",
//         first_name: "Test",
//         last_name: "User",
//         user_type: "STUDENT",
//       },
//     });

//     const speaker = await prisma.speaker.create({
//       data: {
//         first_name: "Speaker",
//         last_name: "Name",
//         bio: "Bio",
//         title: "Title",
//         type: "FACULTY",
//       },
//     });

//     const chapelSession = await prisma.chapelSession.create({
//       data: {
//         speaker_id: speaker.id,
//         topic: "Hope",
//         scripture: "Romans 15:13",
//         date: new Date("2024-05-08T10:00:00Z"),
//         end_time: new Date("2024-05-08T11:00:00Z"),
//         number_standings: 175,
//       },
//     });

//     const created = await prisma.feedback.create({
//       data: {
//         stars: 5,
//         response: "Great session!",
//         user_id: user.id,
//         chapel_session_id: chapelSession.id,
//       },
//     });

//     const response = await request(app).get(`/api/feedbacks/${created.id}`);

//     expect(response.status).toBe(200);
//     expect(response.body.stars).toBe(5);
//     expect(response.body.response).toBe("Great session!");
//     expect(response.body.user_id).toBe(user.id);
//     expect(response.body.chapel_session_id).toBe(chapelSession.id);
//   });

//   it("Should return 404 when feedback not found.", async () => {
//     const response = await request(app).get("/api/feedbacks/99999");
//     expect(response.status).toBe(404);
//   });

//   it("Should include chapel session and speaker when requested.", async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "user@example.com",
//         first_name: "John",
//         last_name: "Doe",
//         user_type: "STUDENT",
//       },
//     });

//     const speaker = await prisma.speaker.create({
//       data: {
//         first_name: "Jane",
//         last_name: "Smith",
//         bio: "Bio",
//         title: "Pastor",
//         type: "FACULTY",
//       },
//     });

//     const chapelSession = await prisma.chapelSession.create({
//       data: {
//         speaker_id: speaker.id,
//         topic: "Love",
//         scripture: "1 John 4:8",
//         date: new Date("2024-05-15T10:00:00Z"),
//         end_time: new Date("2024-05-15T11:00:00Z"),
//         number_standings: 200,
//       },
//     });

//     const created = await prisma.feedback.create({
//       data: {
//         stars: 4,
//         response: "Meaningful message.",
//         user_id: user.id,
//         chapel_session_id: chapelSession.id,
//       },
//     });

//     const response = await request(app).get(`/api/feedbacks/${created.id}?include=chapelSession`);

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("chapelSession");
//     expect(response.body.chapelSession.topic).toBe("Love");
//     expect(response.body.chapelSession).toHaveProperty("speaker");
//     expect(response.body.chapelSession.speaker.first_name).toBe("Jane");
//     expect(response.body.chapelSession.speaker.last_name).toBe("Smith");
//   });
// });

// describe("POST /api/feedbacks", () => {
//   it("Should create a new feedback with valid data.", async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "user@example.com",
//         first_name: "Test",
//         last_name: "User",
//         user_type: "STUDENT",
//       },
//     });

//     const speaker = await prisma.speaker.create({
//       data: {
//         first_name: "Speaker",
//         last_name: "Name",
//         bio: "Bio",
//         title: "Title",
//         type: "FACULTY",
//       },
//     });

//     const chapelSession = await prisma.chapelSession.create({
//       data: {
//         speaker_id: speaker.id,
//         topic: "Grace",
//         scripture: "Ephesians 2:8",
//         date: new Date("2024-05-20T10:00:00Z"),
//         end_time: new Date("2024-05-20T11:00:00Z"),
//         number_standings: 180,
//       },
//     });

//     const newFeedback = {
//       stars: 5,
//       response: "Wonderful chapel session!",
//       user_id: user.id,
//       chapel_session_id: chapelSession.id,
//     };

//     const response = await request(app).post("/api/feedbacks").send(newFeedback);

//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("id");
//     expect(response.body.stars).toBe(5);
//     expect(response.body.response).toBe("Wonderful chapel session!");
//     expect(response.body.user_id).toBe(user.id);
//     expect(response.body.chapel_session_id).toBe(chapelSession.id);
//   });

//   it("Should create feedbacks with different star ratings.", async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "user@example.com",
//         first_name: "Test",
//         last_name: "User",
//         user_type: "STUDENT",
//       },
//     });

//     const speaker = await prisma.speaker.create({
//       data: {
//         first_name: "Speaker",
//         last_name: "Name",
//         bio: "Bio",
//         title: "Title",
//         type: "FACULTY",
//       },
//     });

//     const chapelSession = await prisma.chapelSession.create({
//       data: {
//         speaker_id: speaker.id,
//         topic: "Topic",
//         scripture: "Scripture",
//         date: new Date("2024-05-25T10:00:00Z"),
//         end_time: new Date("2024-05-25T11:00:00Z"),
//         number_standings: 150,
//       },
//     });

//     for (let stars = 1; stars <= 5; stars++) {
//       const response = await request(app)
//         .post("/api/feedbacks")
//         .send({
//           stars: stars,
//           response: `${stars} star feedback`,
//           user_id: user.id,
//           chapel_session_id: chapelSession.id,
//         });

//       expect(response.status).toBe(201);
//       expect(response.body.stars).toBe(stars);
//     }
//   });

//   it("Should return 400 when creating feedback with invalid user_id.", async () => {
//     const speaker = await prisma.speaker.create({
//       data: {
//         first_name: "Speaker",
//         last_name: "Name",
//         bio: "Bio",
//         title: "Title",
//         type: "FACULTY",
//       },
//     });

//     const chapelSession = await prisma.chapelSession.create({
//       data: {
//         speaker_id: speaker.id,
//         topic: "Topic",
//         scripture: "Scripture",
//         date: new Date("2024-05-30T10:00:00Z"),
//         end_time: new Date("2024-05-30T11:00:00Z"),
//         number_standings: 150,
//       },
//     });

//     const response = await request(app)
//       .post("/api/feedbacks")
//       .send({
//         stars: 5,
//         response: "Feedback",
//         user_id: 99999,
//         chapel_session_id: chapelSession.id,
//       });

//     expect(response.status).toBe(400);
//   });

//   it("Should return 400 when creating feedback with invalid chapel_session_id.", async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "user@example.com",
//         first_name: "Test",
//         last_name: "User",
//         user_type: "STUDENT",
//       },
//     });

//     const response = await request(app)
//       .post("/api/feedbacks")
//       .send({
//         stars: 5,
//         response: "Feedback",
//         user_id: user.id,
//         chapel_session_id: 99999,
//       });

//     expect(response.status).toBe(400);
//   });

//   it("Should return 400 when creating feedback with invalid stars value.", async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "user@example.com",
//         first_name: "Test",
//         last_name: "User",
//         user_type: "STUDENT",
//       },
//     });

//     const speaker = await prisma.speaker.create({
//       data: {
//         first_name: "Speaker",
//         last_name: "Name",
//         bio: "Bio",
//         title: "Title",
//         type: "FACULTY",
//       },
//     });

//     const chapelSession = await prisma.chapelSession.create({
//       data: {
//         speaker_id: speaker.id,
//         topic: "Topic",
//         scripture: "Scripture",
//         date: new Date("2024-06-01T10:00:00Z"),
//         end_time: new Date("2024-06-01T11:00:00Z"),
//         number_standings: 150,
//       },
//     });

//     const response = await request(app)
//       .post("/api/feedbacks")
//       .send({
//         stars: 6,
//         response: "Invalid stars",
//         user_id: user.id,
//         chapel_session_id: chapelSession.id,
//       });

//     expect(response.status).toBe(400);
//   });

//   it("Should return 400 when creating feedback without required fields.", async () => {
//     const response = await request(app)
//       .post("/api/feedbacks")
//       .send({
//         stars: 5,
//       });

//     expect(response.status).toBe(400);
//   });
// });

// describe("PATCH /api/feedbacks/:id", () => {
//   it("Should update feedback information.", async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "user@example.com",
//         first_name: "Test",
//         last_name: "User",
//         user_type: "STUDENT",
//       },
//     });

//     const speaker = await prisma.speaker.create({
//       data: {
//         first_name: "Speaker",
//         last_name: "Name",
//         bio: "Bio",
//         title: "Title",
//         type: "FACULTY",
//       },
//     });

//     const chapelSession = await prisma.chapelSession.create({
//       data: {
//         speaker_id: speaker.id,
//         topic: "Topic",
//         scripture: "Scripture",
//         date: new Date("2024-06-05T10:00:00Z"),
//         end_time: new Date("2024-06-05T11:00:00Z"),
//         number_standings: 150,
//       },
//     });

//     const created = await prisma.feedback.create({
//       data: {
//         stars: 3,
//         response: "Old response",
//         user_id: user.id,
//         chapel_session_id: chapelSession.id,
//       },
//     });

//     const response = await request(app)
//       .patch(`/api/feedbacks/${created.id}`)
//       .send({
//         stars: 5,
//         response: "Updated response",
//       });

//     expect(response.status).toBe(200);
//     expect(response.body.stars).toBe(5);
//     expect(response.body.response).toBe("Updated response");
//   });

//   it("Should return 404 when updating non-existent feedback.", async () => {
//     const response = await request(app)
//       .patch("/api/feedbacks/99999")
//       .send({
//         stars: 5,
//       });

//     expect(response.status).toBe(404);
//   });
// });

// describe("DELETE /api/feedbacks/:id", () => {
//   it("Should delete a feedback.", async () => {
//     const user = await prisma.user.create({
//       data: {
//         email: "user@example.com",
//         first_name: "Test",
//         last_name: "User",
//         user_type: "STUDENT",
//       },
//     });

//     const speaker = await prisma.speaker.create({
//       data: {
//         first_name: "Speaker",
//         last_name: "Name",
//         bio: "Bio",
//         title: "Title",
//         type: "FACULTY",
//       },
//     });

//     const chapelSession = await prisma.chapelSession.create({
//       data: {
//         speaker_id: speaker.id,
//         topic: "Topic",
//         scripture: "Scripture",
//         date: new Date("2024-06-10T10:00:00Z"),
//         end_time: new Date("2024-06-10T11:00:00Z"),
//         number_standings: 150,
//       },
//     });

//     const created = await prisma.feedback.create({
//       data: {
//         stars: 4,
//         response: "To delete",
//         user_id: user.id,
//         chapel_session_id: chapelSession.id,
//       },
//     });

//     const response = await request(app).delete(`/api/feedbacks/${created.id}`);

//     expect(response.status).toBe(204);

//     const deleted = await prisma.feedback.findUnique({
//       where: { id: created.id },
//     });

//     expect(deleted).toBeNull();
//   });

//   it("Should return 404 when deleting non-existent feedback.", async () => {
//     const response = await request(app).delete("/api/feedbacks/99999");
//     expect(response.status).toBe(404);
//   });
// });