import { Request, Response, NextFunction, response } from "express";
import { prisma } from "../lib/prisma.js";
import { UserType } from "../generated/prisma/enums.js";

// model FEEDBACK{
//   id Int @id @default(autoincrement())
//   stars Int
//   response String
//   user_id Int
//   user    USER @relation(fields: [user_id], references: [id])
//   chapel_session_id Int
//   chapel_session CHAPEL_SESSION @relation(fields: [chapel_session_id], references: [id])
// }

interface AppError extends Error {
  statusCode?: number;
}

interface FeedbackParams{
    id: string;
}

interface ChapelParams{
    chapelId: string
}

interface ChapelFeedbackParams {
    chapelId: string;
    feedbackId: string;
}

// Get all Feedback for a chapel session
export const getAllFeedback = async (
    req: Request<ChapelParams>,
    res: Response,
    next: NextFunction)
    :Promise<void> => {
        try {
        const chapelId = parseInt(req.params.chapelId, 10);

        const chapelSession = await prisma.cHAPEL_SESSION.findUnique({
            where: { id: parseInt(Array.isArray(req.params.chapelId) ? req.params.chapelId[0] : req.params.chapelId, 10) },
            include: {
                feedbacks: {
                    include: {
                        user: true
                    }
                },
                speaker: true
            }
        });

        if (!chapelSession) {
            const err: AppError = new Error("Chapel session not found");
            err.statusCode = 404;
            return next(err);
        }

        res.json(chapelSession.feedbacks); 
    } catch (error) {
        next(error);
    }
}

// Get a certain Feedback for a chapel
export const getFeedbackById = async (
    req: Request<ChapelFeedbackParams>,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const chapelId = parseInt(req.params.chapelId, 10);
        const feedbackId = parseInt(req.params.feedbackId, 10);

        const feedback = await prisma.fEEDBACK.findFirst({
            where: {
                id: feedbackId,
                chapel_session_id: chapelId
            },
            include: {
                user: true,
                chapel_session: {
                    include: {
                        speaker: true
                    }
                }
            }
        });

        if (!feedback) {
            const err: AppError = new Error("Feedback not found for this chapel session");
            err.statusCode = 404;
            return next(err);
        }

        res.json(feedback);
    } catch (error) {
        next(error);
    }
}

// Create Feedback
export const createFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { chapel_session_id, stars, response, user_id} = req.body;
    
    const userExists = await prisma.uSER.findUnique({
                where: { id: user_id }
            });

    if (!userExists) {
            const err: AppError = new Error("User not found");
            err.statusCode = 404;
            return next(err);
        }
    
    const chapelExists = await prisma.cHAPEL_SESSION.findUnique({
            where: { id: chapel_session_id }
        });
        
        if (!chapelExists) {
            const err: AppError = new Error("Chapel session not found");
            err.statusCode = 404;
            return next(err);
        }

    const feedback = await prisma.fEEDBACK.create({
      data: {
        chapel_session_id: chapel_session_id,
        stars: stars,
        response: response,
        user_id: user_id,
      },
      include: {
                user: true,
                chapel_session: {
                    include: {
                        speaker: true
                    }
                }
            }
    });
    
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

//Update Feedback
export const updateFeedback = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
        const feedbackId = parseInt(req.params.id, 10);
        
        // Check if feedback exists
        const feedback = await prisma.fEEDBACK.findUnique({
            where: { id: feedbackId }
        });
        
        if (!feedback) {
            const err: AppError = new Error("Feedback not found");
            err.statusCode = 404;
            return next(err);
        }
        // Check if chapel id exists
        const updateData: any = {};
        if (req.body.stars !== undefined) updateData.stars = req.body.stars;
        if (req.body.response !== undefined) updateData.response = req.body.response;
        if (req.body.chapel_session_id !== undefined) {
            // Check if new chapel session exists
            const chapelExists = await prisma.cHAPEL_SESSION.findUnique({
                where: { id: req.body.chapel_session_id }
            });
            
            if (!chapelExists) {
                const err: AppError = new Error("Chapel session not found");
                err.statusCode = 404;
                return next(err);
            }
            
            updateData.chapel_session_id = req.body.chapel_session_id;
        }
        
        // Update the feedback
        const updatedFeedback = await prisma.fEEDBACK.update({
            where: { id: feedbackId },
            data: updateData,
            include: {
                user: true,
                chapel_session: {
                    include: {
                        speaker: true 
                    }
                }
            }
        });
        
        res.json(updatedFeedback);
    } catch (error) {
        next(error);
    }
};
  

// Delete Feedback
export const deleteFeedback = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await prisma.fEEDBACK.delete({
              where: { id: parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10) },
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
