import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { User } from "../generated/prisma/client.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface UserParams {
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
export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    return next(e);
  }
};

// GET /api/tasks/:id — returns a single task by ID
export const getUserById = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!user) {
      return next(createError("User not found", 404));
    }
    res.json(user);
  } catch (e) {
    return next(e);
  }
};

// POST /api/tasks — creates a new task
// Expects JSON body: { "title": "..." }
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, first_name, last_name, usertype} = req.body;

    const user: User = await prisma.user.create({
      data: {
        email: email,
        first_name: first_name,
        last_name: last_name,
        usertype: usertype 
      }
    });

    res.status(201).json(user);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/tasks/:id — partially updates a task
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateUser = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, first_name, last_name, usertype } = req.body;

    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(email !== undefined && { email }),
        ...(first_name !== undefined && { first_name }),
        ...(last_name !== undefined && { last_name }),
        ...(usertype !== undefined && { usertype }),
      }
    });
    res.json(user);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("User not found", 404));
    }
    return next(e);
  }
};

// DELETE /api/tasks/:id — removes a task
export const deleteUser = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });
    console.log("Deleted user ID", req.params.id)
    res.status(204).send();
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("User not found", 404));
    }
    return next(e);
  }
};
