import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

// Data model for a task
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface TaskParams {
  id: string;
}

// In-memory store (replace with database in production)
let tasks: Task[] = [];
let nextId = 1;

// GET /api/tasks — returns all tasks
export const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const t = await prisma.task.findMany();
  console.log(t);

  res.json(t);
};

// GET /api/tasks/:id — returns a single task by ID
// Uses next(err) to pass errors to the global error handler
export const getTaskById = (
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
): void => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id, 10));

  if (!task) {
    const err: AppError = new Error("Task not found");
    err.statusCode = 404;
    return next(err); // Delegates to errorHandler middleware
  }
  res.json(task);
};

// POST /api/tasks — creates a new task
// Expects JSON body: { "title": "..." }
export const createTask = (req: Request, res: Response): void => {
  const { title } = req.body;
  const task: Task = {
    id: nextId++,
    title: title || "Untitled",
    completed: false,
  };
  tasks.push(task);
  res.status(201).json(task); // 201 Created
};

// PATCH /api/tasks/:id — partially updates a task
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateTask = (
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
): void => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id, 10));
  if (!task) {
    const err: AppError = new Error("Task not found");
    err.statusCode = 404;
    return next(err);
  }
  // Only update fields that were provided
  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  res.json(task);
};

// DELETE /api/tasks/:id — removes a task
export const deleteTask = (
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
): void => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id, 10));
  if (index === -1) {
    const err: AppError = new Error("Task not found");
    err.statusCode = 404;
    return next(err);
  }
  tasks.splice(index, 1);
  res.status(204).send(); // 204 No Content
};
