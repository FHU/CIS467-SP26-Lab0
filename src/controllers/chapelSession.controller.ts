import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { ChapelSession } from "../generated/prisma/client.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface chapelSessionParams {
  id: string;
  speaker_id: Number;
  topic: String;
  scripture: String;
  date: Date;
  end_time: Date;
  number_standing: Number
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
export const getAllchapelSessions = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const chapelSession = await prisma.chapelSession.findMany();
    res.json(chapelSession);
  } catch (e) {
    return next(e);
  }
};

// GET /api/tasks/:id — returns a single task by ID
export const getChapelSessionById = async (
  req: Request<chapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const chapelSession = await prisma.chapelSession.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!chapelSession) {
      return next(createError("chapelSession not found", 404));
    }
    res.json(chapelSession);
  } catch (e) {
    return next(e);
  }
};

// POST /api/tasks — creates a new task
// Expects JSON body: { "title": "..." }
export const createChapelSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, speaker_id, topic, scripture, date, end_time, number_standing} = req.body;

    const chapelSession: ChapelSession = await prisma.chapelSession.create({
      data: {
        id: id,
        speaker_id: speaker_id,
        topic: topic,
        scripture: scripture,
        date: date,
        end_time: end_time,
        number_standing: number_standing 
      }
    });

    res.status(201).json(chapelSession);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/tasks/:id — partially updates a task
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateChapelSession = async (
  req: Request<chapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, email, first_name, last_name } = req.body;

    const chapelSession = await prisma.chapelSession.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(id !== undefined && { id }),
        ...(email !== undefined && { email }),
        ...(first_name !== undefined && { id }),
        ...(last_name !== undefined && { email })
      }
    });
    res.json(chapelSession);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Chapel Session not found", 404));
    }
    return next(e);
  }
};

// DELETE /api/tasks/:id — removes a task
export const deleteChapelSession = async (
  req: Request<chapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.chapelSession.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Chapel Session not found", 404));
    }
    return next(e);
  }
};
