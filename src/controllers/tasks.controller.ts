import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { Task } from "../generated/prisma/client.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface TaskParams {
  id: string;
}

// Helper to create an AppError with a status code
const createError = (message: string, statusCode: number): AppError => {
  const err: AppError = new Error(message);
  err.statusCode = statusCode;
  return err;
};

// Check if error is Prisma's "record not found" error
const isNotFoundError = (e: unknown): boolean => {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    e.code === "P2025"
  );
};

// GET /api/tasks — returns all tasks
export const getAllTasks = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (e) {
    return next(e);
  }
};

// GET /api/tasks/:id — returns a single task by ID
export const getTaskById = async (
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!task) {
      return next(createError("Task not found", 404));
    }
    res.json(task);
  } catch (e) {
    return next(e);
  }
};

// POST /api/tasks — creates a new task
// Expects JSON body: { "title": "..." }
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title } = req.body;

    const task: Task = await prisma.task.create({
      data: {
        title: title || "Untitled"
      }
    });

    res.status(201).json(task);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/tasks/:id — partially updates a task
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateTask = async (
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, completed } = req.body;

    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed })
      }
    });
    res.json(task);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Task not found", 404));
    }
    return next(e);
  }
};

// DELETE /api/tasks/:id — removes a task
export const deleteTask = async (
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Task not found", 404));
    }
    return next(e);
  }
};
