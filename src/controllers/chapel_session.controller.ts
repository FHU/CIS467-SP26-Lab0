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

// GET /api/chapel_sessions — returns all chapel sessions
export const getAllChapelSessions = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const chapel_sessions = await prisma.chapel_session.findMany();
    res.json(chapel_sessions);
  } catch (e) {
    return next(e);
  }
};

// GET /api/chapel_sessions/:id — returns a single chapel session by ID
export const getChapelSessionById = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const chapel_session = await prisma.chapel_session.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!chapel_session) {
      return next(createError("Chapel session not found", 404));
    }
    res.json(chapel_session);
  } catch (e) {
    return next(e);
  }
};

// POST /api/chapel_sessions — creates a new chapel_session
// Expects JSON body: { "title": "..." }
export const createChapelSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic, scripture, end_time, date, standing_number, chapel_speaker, speaker_id, reviews } = req.body;

    const chapel_session: ChapelSession = await prisma.chapel_session.create({
      data: {
        topic: topic || "Untitled",
        scripture: scripture,
        end_time: end_time || 11,
        date: date,
        standing_number: standing_number || 0,
        chapel_speaker: chapel_speaker,
        speaker_id: speaker_id,
        reviews: reviews || [],
      }
    });

    res.status(201).json(chapel_session);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/chapel_sessions/:id — partially updates a chapel session
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateChapelSession = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { topic, scripture, end_time, date, standing_number, chapel_speaker, speaker_id, reviews } = req.body;

    const chapel_session = await prisma.chapel_session.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(topic !== undefined && { topic }),
        ...(scripture !== undefined && { scripture }),
        ...(end_time !== undefined && { end_time }),
        ...(date !== undefined && { date }),
        ...(standing_number !== undefined && { standing_number }),
        ...(chapel_speaker !== undefined && { chapel_speaker }),
        ...(speaker_id !== undefined && { speaker_id }),
        ...(reviews !== undefined && { reviews }),
      }
    });
    res.json(chapel_session);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Chapel session not found", 404));
    }
    return next(e);
  }
};

// DELETE /api/chapel_sessions/:id — removes a chapel session
export const deleteChapelSession = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.chapel_session.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Chapel session not found", 404));
    }
    return next(e);
  }
};
