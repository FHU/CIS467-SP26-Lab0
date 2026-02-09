import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { UserType } from "../generated/prisma/enums.js";

// model SPEAKER{
//   id Int @id @default(autoincrement())
//   first_name  String?
//   last_name String?
//   type UserType
//   bio String?
//   title Title?
//   chapel_sessions CHAPEL_SESSION[] @relation("SpeakerToChapelSession")
// }

interface AppError extends Error {
  statusCode?: number;
}

interface SpeakerParams {
    id: string;
}

// Get all Speakers
export const getAllSpeakers = async (
    req: Request,
    res: Response)
    :Promise<void> => {
        console.log("testing");
        const t = await prisma.sPEAKER.findMany()
        console.log(t);

        res.json(t);
}

export const getSpeakerById = async (
    req: Request<SpeakerParams>,
    res: Response,
    next: NextFunction,
   ): Promise<void> => {
  try {
    const speaker = await prisma.sPEAKER.findUnique({
        where: {id: parseInt(req.params.id, 10)}
    })
    if (!speaker) {
      const err: AppError = new Error("speaker not found");
      err.statusCode = 404;
      return next(err); 
    }
    res.json(speaker);
  }
  catch (error){
    next (error);
  }

    }

// Create Speaker
export const createSpeaker = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { first_name, last_name, bio, type, title } = req.body;
    
    const speaker = await prisma.sPEAKER.create({
      data: {
        first_name: first_name || null,
        last_name: last_name || null,
        bio: bio,
        title: title,
        type: type,
      },
    });
    
    res.status(201).json(speaker);
  } catch (error) {
    next(error);
  }
};

//Update speaker
export const updateSpeaker = async (
  req: Request<SpeakerParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
    const speaker = await prisma.sPEAKER.findUnique({
            where: { id: parseInt(req.params.id, 10) }
        });
  if (!speaker) {
    const err: AppError = new Error("speaker not found");
    err.statusCode = 404;
    return next(err);
  }
  // Only update fields that were provided
  if (req.body.id !== undefined) speaker.id = req.body.id;
  if (req.body.first_name !== undefined) speaker.first_name = req.body.first_name;
  if (req.body.last_name !== undefined) speaker.last_name = req.body.last_name;
  if (req.body.type !== undefined) speaker.type = req.body.type;
  if (req.body.bio !== undefined) speaker.bio = req.body.bio;
  if (req.body.title !== undefined) speaker.title = req.body.title;
  res.json(speaker);
};

// Delete Speaker
export const deleteSpeaker = async (
  req: Request<SpeakerParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await prisma.sPEAKER.delete({
      where: { id: parseInt(req.params.id, 10) }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
