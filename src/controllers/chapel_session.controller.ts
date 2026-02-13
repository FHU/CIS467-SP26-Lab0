import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { ChapelSession } from "../generated/prisma/client.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface ChapelSessionParams {
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

// GET /api/feedback — returns all feedback
export const getAllChapelSessions = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = await prisma.feedback.findMany();
    const chapel_session = await prisma.chapelSession.findMany();
    const speakers = await prisma.speaker.findMany();
    res.json({ chapel_session, feedback, speakers });
  } catch (e) {
    return next(e);
  }
};

// GET /api/chapel_session/:id — returns a single chapel session by ID
export const getChapelSessionById = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await prisma.chapelSession.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!session) {
      return next(createError("Chapel Session not found", 404));
    }
    res.json(session);
  } catch (e) {
    return next(e);
  }
};

// POST /api/chapel_session — creates a new chapel session
// Expects JSON body: { "name": "..." }
export const createChapelSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic } = req.body;

    const session: ChapelSession = await prisma.chapelSession.create({
      data: {
        topic: topic || "Untitled Chapel Session",
        speaker: {
          connect: { id: 1 }
        }
      }
    });

    res.status(201).json(session);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/chapel_session/:id — partially updates a chapel session
// Expects JSON body with optional fields: { "topic"? }
export const updateChapelSession = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic } = req.body;

    const task = await prisma.chapelSession.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(topic !== undefined && { topic })
      }
    });
    res.json(task);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Chapel Session not found", 404));
    }
    return next(e);
  }
};

// DELETE /api/chapel_session/:id — removes a chapel session
export const deleteChapelSession = async (
  req: Request<ChapelSessionParams>,
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
