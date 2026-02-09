import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

// Data model for a user
interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  user_type: string

  feedbacks: {
    id: string
    content: string
    rating: number
  }[]
}

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface UserParams {
  id: string;
}

// In-memory store (replace with database in production)
let users: User[] = [];
let nextId = 1;

// GET /api/users — returns all users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const u = await prisma.user.findMany();
  console.log(u);

  res.json(u);
};

// GET /api/users/:id — returns a single user by ID
// Uses next(err) to pass errors to the global error handler
export const getUserById = (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): void => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));

  if (!user) {
    const err: AppError = new Error("User not found");
    err.statusCode = 404;
    return next(err); // Delegates to errorHandler middleware
  }
  res.json(user);
};

// POST /api/users — creates a new user
// Expects JSON body: { "title": "..." }
export const createUser = (req: Request, res: Response): void => {
  const { email, first_name, last_name, user_type, feedbacks } = req.body;
  const user: User = {
    id: nextId++,
    email: email || "",
    first_name: first_name || "",
    last_name: last_name || "",
    user_type: user_type || "customer",
    feedbacks: feedbacks || []
  };
  users.push(user);
  res.status(201).json(user); // 201 Created
};

// PATCH /api/users/:id — partially updates a user
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateUser = (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): void => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    const err: AppError = new Error("User not found");
    err.statusCode = 404;
    return next(err);
  }
  // Only update fields that were provided
  if (req.body.first_name !== undefined) user.first_name = req.body.first_name;
  if (req.body.last_name !== undefined) user.last_name = req.body.last_name;
  if (req.body.email !== undefined) user.email = req.body.email;
  if (req.body.user_type !== undefined) user.user_type = req.body.user_type;
  if (req.body.feedbacks !== undefined) user.feedbacks = req.body.feedbacks;
  res.json(user);
};

// DELETE /api/users/:id — removes a user
export const deleteUser = (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): void => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id, 10));
  if (index === -1) {
    const err: AppError = new Error("User not found");
    err.statusCode = 404;
    return next(err);
  }
  users.splice(index, 1);
  res.status(204).send(); // 204 No Content
};
