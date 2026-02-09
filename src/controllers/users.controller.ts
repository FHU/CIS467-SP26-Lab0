import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

// Data model for a task
interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  user_type: string
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

// GET /api/tasks — returns all tasks
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const t = await prisma.task.findMany();
  console.log(t);

  res.json(t);
};

// GET /api/tasks/:id — returns a single task by ID
// Uses next(err) to pass errors to the global error handler
export const getUserById = (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): void => {
  const user = users.find((t) => t.id === parseInt(req.params.id, 10));

  if (!user) {
    const err: AppError = new Error("User not found");
    err.statusCode = 404;
    return next(err); // Delegates to errorHandler middleware
  }
  res.json(user);
};

// POST /api/tasks — creates a new task
// Expects JSON body: { "title": "..." }
export const createTask = (req: Request, res: Response): void => {
  const { title } = req.body;
  const user: User = {
    id: nextId++,
    email: '',
    first_name: '',
    last_name: '',
    user_type: ''
  };
  users.push(user);
  res.status(201).json(user); // 201 Created
};

// PATCH /api/tasks/:id — partially updates a task
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
  res.json(user);
};

// DELETE /api/tasks/:id — removes a task
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
