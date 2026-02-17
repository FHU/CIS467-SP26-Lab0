import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import request from 'supertest';

import { prisma } from "../lib/prisma.js"
import { setup, dropData, tearDown } from "./setup.js"
import app from "../app.js"


beforeAll(async()=> {
    await setup();
})

beforeEach(async()=> {
    await dropData();
})

afterAll(async()=> {
    await tearDown();
})

describe ('GET /api/users', () => {
    it("should return an empty array when no users exist"),
    async() => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    }
})

describe ('GET /api/users', () => {
    it("should return all task"),
    async() => {
        // arrange - seeding the database
        await prisma.user.createMany({
            data: [
                {name: "John Doe", email: "johndoe@doe.com", user_type: UserType.STUDENT, reviews: ["We stood too much in chapel today.", "Boring."]},
                {name: "Jane Doe", email: "janedoe@doe.com", user_type: UserType.STAFF, reviews: ["Excellent Lesson!"]},
            ]
        })
        // act - send an api req
        const response = await request(app).get('/api/users');
        // assert - test that the output is what we expect
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        
        expect(response.body[0]).toHaveProperty("name", "John Doe")
        expect(response.body[0]).toHaveProperty("email", "johndoe@doe.com")
        expect(response.body[0]).toHaveProperty("user_type", UserType.STUDENT)
        expect(response.body[0]).toHaveProperty("reviews", ["We stood too much in chapel today.", "Boring."])
        
        expect(response.body[1]).toHaveProperty("name", "Jane Doe")
        expect(response.body[1]).toHaveProperty("email", "janedoe@doe.com")
        expect(response.body[1]).toHaveProperty("user_type", UserType.STAFF)
        expect(response.body[1]).toHaveProperty("reviews", ["Excellent Lesson!"]) 
    }
})

describe ('GET /api/users/:id', () => {
    it("should return a single user by id"),
    async() => {
        // arrange - seeding the database
        await prisma.user.createMany({
            data: [
                {name: "John Doe", email: "johndoe@doe.com", user_type: UserType.STUDENT, reviews: ["We stood too much in chapel today.", "Boring."]},
                {name: "Jane Doe", email: "janedoe@doe.com", user_type: UserType.STAFF, reviews: ["Excellent Lesson!"]},
            ]
        })
        // act - send an api req
        const response = await request(app).get('/api/users/1');
        
        // assert - test that the output is what we expect
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.email).toBe("johndoe@doe.com");
        expect(response.body.user_type).toBe(UserType.STUDENT);
        expect(response.body.reviews).toBe(["We stood too much in chapel today.", "Boring."]);


    }
})

