import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

// Data model for a chapel session
interface ChapelSession {
  id: number;
  speaker_id: number
  topic: string
  scripture: string
  date: Date
  end_time: Date
  number_standings: number

  feedbacks : {
    id: string
    stars: number
    response: string
  }[]

  speaker: {
    id: number
    first_name: string
    last_name: string
  }
}

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface ChapelSessionParams {
  id: string;
}

// In-memory store (replace with database in production)
let chapelSessions: ChapelSession[] = [];
let nextId = 1;

// GET /api/chapelSessions — returns all chapel sessions
export const getAllChapelSessions = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const c = await prisma.chapelSession.findMany({
    include: {
      speaker: true,
    }
  });
  console.log(c);

  res.json(c);
};

// GET /api/chapelSessions/:id — returns a single chapel session by ID
// Uses next(err) to pass errors to the global error handler
export const getChapelSessionById = (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): void => {
  const chapelSession = chapelSessions.find((c) => c.id === parseInt(req.params.id, 10));

  if (!chapelSession) {
    const err: AppError = new Error("Chapel Session not found");
    err.statusCode = 404;
    return next(err); // Delegates to errorHandler middleware
  }
  res.json(chapelSession);
};

// POST /api/chapelSession — creates a new chapel session
// Expects JSON body: { "title": "..." }
export const createChapelSession = (req: Request, res: Response): void => {
  const { speaker_id, topic, scripture, date, end_time, number_standings, feedbacks, speaker } = req.body;
  const chapelSession: ChapelSession = {
    id: nextId++,
    speaker_id,
    topic,
    scripture,
    date,
    end_time,
    number_standings,
    feedbacks,
    speaker
  };
  chapelSessions.push(chapelSession);
  res.status(201).json(chapelSession); // 201 Created
};

// PATCH /api/chapelSessions/:id — partially updates a chapel session
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateChapelSession = (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): void => {
  const chapelSession = chapelSessions.find((c) => c.id === parseInt(req.params.id, 10));
  if (!chapelSession) {
    const err: AppError = new Error("Chapel Session not found");
    err.statusCode = 404;
    return next(err);
  }
  // Only update fields that were provided
  if (req.body.speaker_id !== undefined) chapelSession.speaker_id = req.body.speaker_id;
  if (req.body.topic !== undefined) chapelSession.topic = req.body.topic;
  if (req.body.scripture !== undefined) chapelSession.scripture = req.body.scripture;
  if (req.body.date !== undefined) chapelSession.date = req.body.date;
  if (req.body.end_time !== undefined) chapelSession.end_time = req.body.end_time;
  if (req.body.number_standings !== undefined) chapelSession.number_standings = req.body.number_standings;
  if (req.body.feedbacks !== undefined) chapelSession.feedbacks = req.body.feedbacks;
  if (req.body.speaker !== undefined) chapelSession.speaker = req.body.speaker;
  res.json(chapelSession);
};

// DELETE /api/chapelSessions/:id — removes a chapel session
export const deleteChapelSession = (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): void => {
  const index = chapelSessions.findIndex((c) => c.id === parseInt(req.params.id, 10));
  if (index === -1) {
    const err: AppError = new Error("Chapel Session not found");
    err.statusCode = 404;
    return next(err);
  }
  chapelSessions.splice(index, 1);
  res.status(204).send(); // 204 No Content
};
