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

// GET /api/user — returns all users
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

// GET /api/users/:id — returns a single user by ID
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

// POST /api/users — creates a new user
// Expects JSON body: { "title": "..." }
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, user_type, reviews } = req.body;

    const user: User = await prisma.user.create({
      data: {
        name: name || "No name",
        email: email,
        user_type: user_type || "Student",
        reviews: reviews || [],
      }
    });

    res.status(201).json(user);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/users/:id — partially updates a user
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateUser = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, user_type, reviews } = req.body;

    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(user_type !== undefined && { user_type }),
        ...(reviews !== undefined && { reviews }),
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

// DELETE /api/users/:id — removes a user
export const deleteUser = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("User not found", 404));
    }
    return next(e);
  }
};
