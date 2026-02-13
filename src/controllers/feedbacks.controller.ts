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
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    e.code === "P2025"
  );
};

// GET /api/feedbacks — returns all feedbacks
export const getAllFeedbacks = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    res.json(feedbacks);
  } catch (e) {
    return next(e);
  }
};

// GET /api/feedbacks/:id — returns a single feedback by ID
export const getFeedbackById = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!feedback) {
      return next(createError("Feedback not found", 404));
    }
    res.json(feedback);
  } catch (e) {
    return next(e);
  }
};

// POST /api/feedbacks — creates a new feedback
// Expects JSON body: { "response": "...", "stars": 5, "user_id": 1, "chapel_session_id": 1 }
// TODO validate user_id and chapel_session_id exist before creating feedback
export const createFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { response, stars, user_id, chapel_session_id } = req.body;

    const feedback: Feedback = await prisma.feedback.create({
      data: {
        response: response,
        stars: stars,
        user_id: user_id,
        chapel_session_id: chapel_session_id
      }
    });

    res.status(201).json(feedback);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/feedbacks/:id — partially updates a feedback
export const updateFeedback = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {response, stars, user_id, chapel_session_id } = req.body;

    const feedback = await prisma.feedback.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(response !== undefined && { response }),
        ...(stars !== undefined && { stars }),
        ...(user_id !== undefined && { user_id }),
        ...(chapel_session_id !== undefined && { chapel_session_id })
      }
    });
    res.json(feedback);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Feedback not found", 404));
    }
    return next(e);
  }
};

// DELETE /api/feedbacks/:id — removes a feedback
export const deleteFeedback = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.feedback.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Feedback not found", 404));
    }
    return next(e);
  }
};
