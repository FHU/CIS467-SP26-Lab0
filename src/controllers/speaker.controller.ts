import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { Speaker } from "../generated/prisma/client.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface SpeakerParams {
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

// GET /api/speakers — returns all speakers
export const getAllSpeakers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const speakers = await prisma.speaker.findMany();
    res.json(speakers);
  } catch (e) {
    return next(e);
  }
};

// GET /api/speakers/:id — returns a single speaker by ID
export const getSpeakerById = async (
  req: Request<SpeakerParams>,
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

// POST /api/speakers — creates a new speaker
// Expects JSON body: { "title": "..." }
export const createSpeaker = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { first_name, last_name, bio, title, speaker_type, chapel_sessions } = req.body;

    const speaker: Speaker = await prisma.speaker.create({
      data: {
        first_name: first_name || "John",
        last_name: last_name || "Doe",
        bio: bio,
        title: title,
        speaker_type: speaker_type,
        chapel_sessions: chapel_sessions || [],
      }
    });

    res.status(201).json(speaker);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/speakers/:id — partially updates a speaker
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateSpeaker = async (
  req: Request<SpeakerParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { first_name, last_name, bio, title, speaker_type, chapel_sessions } = req.body;

    const speaker = await prisma.speaker.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(first_name !== undefined && { first_name }),
        ...(last_name !== undefined && { last_name }),
        ...(bio !== undefined && { bio }),
        ...(title !== undefined && { title }),
        ...(speaker_type !== undefined && { speaker_type }),
        ...(chapel_sessions !== undefined && { chapel_sessions }),
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

// DELETE /api/speakers/:id — removes a speaker
export const deleteSpeaker = async (
  req: Request<SpeakerParams>,
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
