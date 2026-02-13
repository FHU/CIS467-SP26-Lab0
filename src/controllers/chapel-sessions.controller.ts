import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { UserType } from "../generated/prisma/enums.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface ChapelSessionParams {
  id: string;
}

// GET /api/chapel-sessions — returns all chapel sessions
export const getAllChapelSessions = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const c = await prisma.chapelSession.findMany({
    include: { speaker: true }
  });
  console.log(c);

  res.json(c);
};

// GET /api/chapel-sessions/:id — returns a single chapel session by ID
// Uses next(err) to pass errors to the global error handler
export const getChapelSessionById = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const chapelSession = await prisma.chapelSession.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      include: { speaker: true }
    });

    if (!chapelSession) {
      const err: AppError = new Error("Chapel Session not found");
      err.statusCode = 404;
      return next(err);
    }
    
    res.json(chapelSession);
  } catch (error) {
    next(error);
  }
};

// POST /api/chapel-sessions — creates a new chapel session
// Expects JSON body: { "title": "..." }
export const createChapelSession = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  const { topic, scripture, date, end_time, number_standings, speaker_id } = req.body;

  if (!topic || !scripture || !date || !end_time || !number_standings)
  {
    const err: AppError = new Error("Invalid or missing fields");
    err.statusCode = 400;
    return next(err);
  }

  if (speaker_id !== null) {
    const speaker = await prisma.speaker.findUnique({
      where: { id: speaker_id }
    });

    if (!speaker) {
      const err: AppError = new Error("Invalid speaker_id");
      err.statusCode = 400;
      return next(err);
    }
  }

  const dateObj = new Date(date);
  const endTimeObj = new Date(end_time);
  
  if (endTimeObj <= dateObj) {
    const err: AppError = new Error("end_time must be after date");
    err.statusCode = 400;
    return next(err);
  }
  
  const chapelSession = await prisma.chapelSession.create({
    data: {
      topic,
      scripture,
      date,
      end_time,
      number_standings,
      speaker_id: speaker_id || null
    }
  })

  res.status(201).json(chapelSession); // 201 Created
};

// PATCH /api/chapel-sessions/:id — partially updates a chapel session
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateChapelSession = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const chapelSession = await prisma.chapelSession.findUnique({
    where: { id: parseInt(req.params.id, 10) }
  })

  if (!chapelSession) {
    const err: AppError = new Error("Chapel Session not found");
    err.statusCode = 404;
    return next(err);
  }

  const data: any = {};
  
  if (req.body.topic !== undefined) data.topic = req.body.topic;
  if (req.body.scripture !== undefined) data.scripture = req.body.scripture;
  if (req.body.date !== undefined) data.date = req.body.date;
  if (req.body.end_time !== undefined) data.end_time = req.body.end_time;
  if (req.body.number_standings !== undefined) data.number_standings = req.body.number_standings;
  if (req.body.speaker_id !== undefined) {
    if (req.body.speaker_id !== null) {
      const speaker = await prisma.speaker.findUnique({
        where: { id: req.body.speaker_id }
      });

      if (!speaker) {
        const err: AppError = new Error("Invalid speaker_id");
        err.statusCode = 400;
        return next(err);
      }
    }
    data.speaker_id = req.body.speaker_id;
  }

  const updatedChapelSession = await prisma.chapelSession.update({
    where: { id: parseInt(req.params.id, 10) },
    data
  })
  
  res.status(200).json(updatedChapelSession)
};

// DELETE /api/chapel-sessions/:id — removes a chapel session
export const deleteChapelSession = async (
  req: Request<ChapelSessionParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const chapelSession = await prisma.chapelSession.findUnique({
    where: { id: parseInt(req.params.id, 10) }
  })

  if (!chapelSession) {
    const err: AppError = new Error("Chapel Session not found");
    err.statusCode = 404;
    return next(err);
  }

  await prisma.chapelSession.delete({
    where: { id: parseInt(req.params.id, 10) }
  })

  res.status(204).send(); // 204 No Content
};
