import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { UserType } from "../generated/prisma/enums.js";

// Data model for a speaker
interface Speaker {
  id: number;
  first_name: string;
  last_name: string;
  bio: string;
  title: boolean;
  type: UserType
}

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface SpeakerParams {
  id: string;
}

// In-memory store (replace with database in production)
let speakers: Speaker[] = [];
let nextId = 1;

// GET /api/speakers — returns all speakers
export const getAllSpeakers = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const t = await prisma.speaker.findMany();
  console.log(t);

  res.json(t);
};

// GET /api/speakers/:id — returns a single speaker by ID
// Uses next(err) to pass errors to the global error handler
export const getSpeakerById = (
  req: Request<SpeakerParams>,
  res: Response,
  next: NextFunction
): void => {
  const speaker = speakers.find((s) => s.id === parseInt(req.params.id, 10));

  if (!speaker) {
    const err: AppError = new Error("Speaker not found");
    err.statusCode = 404;
    return next(err); // Delegates to errorHandler middleware
  }
  res.json(speaker);
};

// POST /api/speakers — creates a new speaker
// Expects JSON body: { "title": "..." }
export const createSpeaker = (req: Request, res: Response): void => {
  const { first_name, last_name, bio, title, type } = req.body;
  const speaker: Speaker = {
    id: nextId++,
    first_name,
    last_name,
    bio,
    title,
    type
  };
  speakers.push(speaker);
  res.status(201).json(speaker); // 201 Created
};

// PATCH /api/speakers/:id — partially updates a speaker
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateSpeaker = (
  req: Request<SpeakerParams>,
  res: Response,
  next: NextFunction
): void => {
  const speaker = speakers.find((s) => s.id === parseInt(req.params.id, 10));
  if (!speaker) {
    const err: AppError = new Error("Speaker not found");
    err.statusCode = 404;
    return next(err);
  }
  // Only update fields that were provided
  if (req.body.first_name !== undefined) speaker.first_name = req.body.first_name;
  if (req.body.last_name !== undefined) speaker.last_name = req.body.last_name;
  if (req.body.bio !== undefined) speaker.bio = req.body.bio;
  if (req.body.title !== undefined) speaker.title = req.body.title;
  if (req.body.type !== undefined) speaker.type = req.body.type;

  res.json(speaker);
};

// DELETE /api/speakers/:id — removes a speaker
export const deleteSpeaker = (
  req: Request<SpeakerParams>,
  res: Response,
  next: NextFunction
): void => {
  const index = speakers.findIndex((s) => s.id === parseInt(req.params.id, 10));
  if (index === -1) {
    const err: AppError = new Error("Speaker not found");
    err.statusCode = 404;
    return next(err);
  }
  speakers.splice(index, 1);
  res.status(204).send(); // 204 No Content
};
