import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { Feedback } from "../generated/prisma/client.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface FeedbackParams {
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
    typeof e === "object" && e !== null && "code" in e && e.code === "P2025"
  );
};

// GET /api/feedback — returns all feedback
//Include the chapel session object associated with the feedback, and the speaker object associated with the chapel session
export const getAllFeedback = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const feedback = await prisma.feedback.findMany();
    const chapelSession = await prisma.chapelSession.findMany();
    const speakers = await prisma.speaker.findMany();
    res.json({ feedback, chapelSession, speakers });
  } catch (e) {
    return next(e);
  }
};

// GET /api/feedback/:id — returns a single feedback by ID
//Include the chapel session object associated with the feedback, and the speaker object associated with the chapel session
export const getFeedbackById = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    //find chapel session and speaker object for specific feedback
    const chapelSession = await prisma.chapelSession.findUnique({
      where: { id: feedback?.chapel_session_id },
    });
    const speaker = await prisma.speaker.findUnique({
      where: { id: chapelSession?.speaker_id },
    });

    if (!feedback) {
      return next(createError("Feedback not found", 404));
    }
    res.json({ ...feedback, chapelSession, speaker });
  } catch (e) {
    return next(e);
  }
};

// POST /api/feedback — creates a new feedback
// Expects JSON body with required fields
export const createFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    //Ensure chapel_session_id exists
    if (!req.body.chapel_session_id) {
      return next(createError("chapel_session_id is required", 400));
    }
    const feedBack: Feedback = await prisma.feedback.create({
      data: req.body,
    });

    res.status(201).json(feedBack);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/feedback/:id — partially updates a feedback
// Expects JSON body with optional fields: { "name"?, "completed"? }
//Ensure the entire feedback object is updated, including chapel_session_id
export const updateFeedback = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data: Record<string, any> = {};
    if (req.body.name !== undefined) {
      data.name = req.body.name;
    }
    if (req.body.chapel_session_id !== undefined) {
      data.chapel_session_id = req.body.chapel_session_id;
    }
    const feedback = await prisma.feedback.update({
      where: { id: parseInt(req.params.id) },
      data,
    });
    res.json(feedback);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Feedback not found", 404));
    }
    return next(e);
  }
};

// DELETE /api/feedback/:id — removes a feedback
export const deleteFeedback = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await prisma.feedback.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Feedback not found", 404));
    }
    return next(e);
  }
};
