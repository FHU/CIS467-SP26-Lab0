import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { UserType } from "../generated/prisma/enums.js";

// model CHAPEL_SESSION {
//   id Int @id @default(autoincrement())
//   speaker_id Int
//   speaker SPEAKER @relation(fields: [speaker_id], references: [id], name: "SpeakerToChapelSession")
//   topic String
//   date DateTime
//   time DateTime
//   number_standings Int
//   feedbacks FEEDBACK []
// }

interface AppError extends Error {
  statusCode?: number;
}

interface Chapel_SessionParams {
    id: string;
}

// Get all Chapel_Sessions
export const getAllChapelSessions = async (
    req: Request,
    res: Response)
    :Promise<void> => {
        console.log("testing");
        const t = await prisma.cHAPEL_SESSION.findMany()
        console.log(t);

        res.json(t);
}

export const getChapelSessionById = async (
    req: Request<Chapel_SessionParams>,
    res: Response,
    next: NextFunction,
   ): Promise<void> => {
  try {
    const chapel = await prisma.cHAPEL_SESSION.findUnique({
        where: {id: parseInt(req.params.id, 10)}
    })
    if (!chapel) {
      const err: AppError = new Error("Chapel Session not found");
      err.statusCode = 404;
      return next(err); 
    }
    res.json(chapel);
  }
  catch (error){
    next (error);
  }

    }

// Create Chapel Session
export const createChapelSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { speaker_id, topic, date, time, number_standings } = req.body;
    
    const speakerExists = await prisma.sPEAKER.findUnique({
            where: { id: speaker_id }
        });
        
        if (!speakerExists) {
            const err: AppError = new Error("Speaker not found");
            err.statusCode = 404;
            return next(err);
        }

    const chapel = await prisma.cHAPEL_SESSION.create({
      data: {
        speaker_id: speaker_id,
        topic: topic,
        date: new Date(date),
        time: new Date(time),
        number_standings: number_standings,
      },
    });

    //   id Int @id @default(autoincrement())
    //   speaker_id Int
    //   speaker SPEAKER @relation(fields: [speaker_id], references: [id], name: "SpeakerToChapelSession")
    //   topic String
    //   date DateTime
    //   time DateTime
    //   number_standings Int
    //   feedbacks FEEDBACK []
    
    res.status(201).json(chapel);
  } catch (error) {
    next(error);
  }
};

//Update Chapel Session
export const updateChapelSession = async (
    req: Request<Chapel_SessionParams>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { speaker_id, topic, date, time, number_standings } = req.body;
        
        // Check if chapel session exists
        const chapel = await prisma.cHAPEL_SESSION.findUnique({
            where: { id: parseInt(req.params.id, 10) }
        });
        
        if (!chapel) {
            const err: AppError = new Error("Chapel Session not found");
            err.statusCode = 404;
            return next(err);
        }
        
        const updateData: any = {};
        if (speaker_id !== undefined) updateData.speaker_id = speaker_id;
        if (topic !== undefined) updateData.topic = topic;
        if (date !== undefined) updateData.date = new Date(date); 
        if (time !== undefined) updateData.time = new Date(time); 
        if (number_standings !== undefined) updateData.number_standings = number_standings;
        
        const updated = await prisma.cHAPEL_SESSION.update({
            where: { id: parseInt(req.params.id, 10) },
            data: updateData,
            include: {
                speaker: true
            }
        });
        
        res.json(updated);
    } catch (error) {
        next(error);
    }
};

// Delete Chapel Session
export const deleteChapelSession = async (
  req: Request<Chapel_SessionParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await prisma.cHAPEL_SESSION.delete({
      where: { id: parseInt(req.params.id, 10) }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
