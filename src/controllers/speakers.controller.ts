import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { UserType } from "../generated/prisma/enums.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface SpeakerParams {
  id: string;
}

// GET /api/speakers — returns all speakers
export const getAllSpeakers = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const s = await prisma.speaker.findMany();
  console.log(s);

  res.json(s);
};

// GET /api/speakers/:id — returns a single speaker by ID
// Uses next(err) to pass errors to the global error handler
export const getSpeakerById = async (
  req: Request<SpeakerParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const speaker = await prisma.speaker.findUnique({
      where: { id: parseInt(req.params.id, 10) }
    });

    if (!speaker) {
      const err: AppError = new Error("Speaker not found");
      err.statusCode = 404;
      return next(err);
    }
    
    res.json(speaker);
  } catch (error) {
    next(error);
  }
};

// POST /api/speakers — creates a new speaker
// Expects JSON body: { "title": "..." }
export const createSpeaker = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  const { first_name, last_name, bio, title, type } = req.body;

  if (!first_name || !last_name || !bio || !title || !type
      || !Object.values(UserType).includes(type))
  {
    const err: AppError = new Error("Invalid or missing fields");
    err.statusCode = 400;
    return next(err);
  }
  
  const speaker = await prisma.speaker.create({
    data: {
      first_name,
      last_name,
      bio,
      title,
      type
    }
  })

  res.status(201).json(speaker); // 201 Created
};

// PATCH /api/speakers/:id — partially updates a speaker
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateSpeaker = async (
  req: Request<SpeakerParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const speaker = await prisma.speaker.findUnique({
    where: { id: parseInt(req.params.id, 10) }
  })

  if (!speaker) {
    const err: AppError = new Error("Speaker not found");
    err.statusCode = 404;
    return next(err);
  }

  const data: any = {};
  
  if (req.body.first_name !== undefined) data.first_name = req.body.first_name;
  if (req.body.last_name !== undefined) data.last_name = req.body.last_name;
  if (req.body.bio !== undefined) data.bio = req.body.bio;
  if (req.body.title !== undefined) data.title = req.body.title;
  if (req.body.type !== undefined) {
    if (!Object.values(UserType).includes(req.body.type)) {
      const err: AppError = new Error("Invalid speaker type");
      err.statusCode = 400;
      return next(err);
    }
    data.type = req.body.type;
  }

  const updatedSpeaker = await prisma.speaker.update({
    where: { id: parseInt(req.params.id, 10) },
    data
  })
  
  res.status(200).json(updatedSpeaker)
};

// DELETE /api/speakers/:id — removes a speaker
export const deleteSpeaker = async (
  req: Request<SpeakerParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const speaker = await prisma.speaker.findUnique({
    where: { id: parseInt(req.params.id, 10) }
  })

  if (!speaker) {
    const err: AppError = new Error("Speaker not found");
    err.statusCode = 404;
    return next(err);
  }

  await prisma.speaker.delete({
    where: { id: parseInt(req.params.id, 10) }
  })

  res.status(204).send(); // 204 No Content
};
