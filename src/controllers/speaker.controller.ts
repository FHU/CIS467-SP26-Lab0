import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { Speaker } from "../generated/prisma/client.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface speakerParams {
  id: number;
  first_name: String;
  last_name: String;
  bio: String;
  title: String;

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
export const getAllSpeakers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const speaker = await prisma.speaker.findMany();
    res.json(speaker);
  } catch (e) {
    return next(e);
  }
};

// GET /api/tasks/:id — returns a single task by ID
export const getSpeakerById = async (
  req: Request<speakerParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const speaker = await prisma.speaker.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!speaker) {
      return next(createError("Speaker not found", 404));
    }
    res.json(speaker);
  } catch (e) {
    return next(e);
  }
};

// POST /api/tasks — creates a new task
// Expects JSON body: { "title": "..." }
export const createSpeaker = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, bio, first_name, last_name, title} = req.body;

    const speaker: Speaker = await prisma.speaker.create({
      data: {
        id: id,
        bio: bio,
        first_name: first_name,
        last_name: last_name,
        title: title 
      }
    });

    res.status(201).json(speaker);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/tasks/:id — partially updates a task
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateSpeaker = async (
  req: Request<speakerParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, email, first_name, last_name } = req.body;

    const speaker = await prisma.speaker.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(id !== undefined && { id }),
        ...(email !== undefined && { email }),
        ...(first_name !== undefined && { id }),
        ...(last_name !== undefined && { email })
      }
    });
    res.json(speaker);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Speaker not found", 404));
    }
    return next(e);
  }
};

// DELETE /api/tasks/:id — removes a task
export const deleteSpeaker = async (
  req: Request<speakerParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.speaker.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Speaker not found", 404));
    }
    return next(e);
  }
};
