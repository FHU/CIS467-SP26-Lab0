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

// GET /api/chapelsessions — returns all chapel sessions
export const getAllChapelSessions = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try { 
    const chapelsessions = await prisma.chapelSession.findMany();
    res.json(chapelsessions);
  } catch (e) {
    return next(e);
  }
};

// GET /api/chapelsessions/:id — returns a single chapel session by ID
export const getChapelSessionById = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const chapelsession = await prisma.chapelSession.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!chapelsession) {
      return next(createError("Chapel session not found", 404));
    }
    res.json(chapelsession);
  } catch (e) {
    return next(e);
  }
};

// POST /api/chapelsessions — creates a new chapel session

export const createChapelSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { date, end_time, speaker_id, number_standings } = req.body;

    const chapelsession: ChapelSession = await prisma.chapelSession.create({
      data: {
        date,
        end_time: end_time,
        speaker_id: speaker_id || 1, // TODO: replace with actual speaker ID from request body when speaker functionality is implemented
        number_standings: number_standings || 0,
      }
    });

    res.status(201).json(chapelsession);
  } catch (e) {
    return next(e);
  }
};
 
// PATCH /api/chapelsessions/:id — partially updates a chapel session
// Expects JSON body with optional fields: { "date"?, "location"?, "description"?, "duration"? }
export const updateChapelSession = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { date, end_time, speaker_id, number_standings } = req.body;

    const chapelsession = await prisma.chapelSession.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(date !== undefined && { date }),
        ...(end_time !== undefined && { end_time }),
        ...(speaker_id !== undefined && { speaker_id }),
        ...(number_standings !== undefined && { number_standings })
      }
    });
    res.json(chapelsession);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Chapel session not found", 404));
    }
  }
};

// DELETE /api/chapelsessions/:id — removes a chapel session
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
      return next(createError("Chapel session not found", 404));
    }
    return next(e);
  }
};
