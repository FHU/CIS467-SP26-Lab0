import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { UserType } from "../generated/prisma/enums.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface FeedbackParams {
  id: string;
}

// GET /api/feedbacks — returns all feedbacks
export const getAllFeedbacks = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const f = await prisma.feedback.findMany({
    include: {
      chapelSession: {
        include: {
          speaker: true
        }
      }
    }
  });
  console.log(f);

  res.json(f);
};

// GET /api/feedbacks/:id — returns a single feedback by ID
// Uses next(err) to pass errors to the global error handler
export const getFeedbackById = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: parseInt(req.params.id, 10) },
      include: {
        chapelSession: {
        include: {
          speaker: true
        }
      }
      }
    });

    if (!feedback) {
      const err: AppError = new Error("Feedback not found");
      err.statusCode = 404;
      return next(err);
    }
    
    res.json(feedback);
  } catch (error) {
    next(error);
  }
};

// POST /api/feedbacks — creates a new feedback
// Expects JSON body: { "title": "..." }
export const createFeedback = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  const { chapel_session_id, user_id, stars, response } = req.body;

  if (!chapel_session_id || !user_id || !stars || !response ) 
  {
    const err: AppError = new Error("Invalid or missing fields");
    err.statusCode = 400;
    return next(err);
  }

  if (stars < 1 || stars > 5 || !Number.isInteger(stars)) 
  {
    const err: AppError = new Error("Stars must be an integer between 1 and 5");
    err.statusCode = 400;
    return next(err);
  }

  const session = await prisma.chapelSession.findUnique({
    where: { id: chapel_session_id }
  });

  if (!session) {
    const err: AppError = new Error("Chapel Session not found");
    err.statusCode = 400;
    return next(err);
  }

  const userExists = await prisma.user.findUnique({
    where: { id: user_id }
  });

  if (!userExists) {
    const err: AppError = new Error("Invalid user_id");
    err.statusCode = 400;
    return next(err);
  }
  
  const feedback = await prisma.feedback.create({
    data: {
      chapel_session_id,
      user_id,
      stars,
      response
    }
  })

  res.status(201).json(feedback); // 201 Created
};

// PATCH /api/feedbacks/:id — partially updates a feedback
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateFeedback = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const feedback = await prisma.feedback.findUnique({
    where: { id: parseInt(req.params.id, 10) }
  })

  if (!feedback) {
    const err: AppError = new Error("Feedback not found");
    err.statusCode = 404;
    return next(err);
  }

  const data: any = {};
  
  if (req.body.chapel_session_id !== undefined) {data.chapel_session_id = req.body.chapel_session_id}
  if (req.body.user_id !== undefined) {data.user_id = req.body.user_id}
  if (req.body.stars !== undefined) {data.stars = req.body.stars}
  if (req.body.response !== undefined) {data.response = req.body.response}

  const updatedFeedback = await prisma.feedback.update({
    where: { id: parseInt(req.params.id, 10) },
    data
  })
  
  res.status(200).json(updatedFeedback)
};

// DELETE /api/feedback/:id — removes a feedback
export const deleteFeedback = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const feedback = await prisma.feedback.findUnique({
    where: { id: parseInt(req.params.id, 10) }
  })

  if (!feedback) {
    const err: AppError = new Error("Feedback not found");
    err.statusCode = 404;
    return next(err);
  }

  await prisma.feedback.delete({
    where: { id: parseInt(req.params.id, 10) }
  })

  res.status(204).send(); // 204 No Content
};
