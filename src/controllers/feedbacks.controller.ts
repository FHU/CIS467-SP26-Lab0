import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

// Data model for a feedback
interface Feedback {
  id: number
  stars: number
  response: string
  user_id: number
  chapel_session_id: number

  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    user_type: string
  }

  chapelSession: {
    id: number
    name: string
    date: Date
  }
}

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface FeedbackParams {
  id: string;
}

// In-memory store (replace with database in production)
let feedbacks: Feedback[] = [];
let nextId = 1;

// GET /api/feedbacks — returns all feedbacks
export const getAllFeedbacks = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const f = await prisma.feedback.findMany();
  console.log(f);

  res.json(f);
};

// GET /api/feedbacks/:id — returns a single feedback by ID
// Uses next(err) to pass errors to the global error handler
export const getFeedbackById = (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): void => {
  const feedback = feedbacks.find((f) => f.id === parseInt(req.params.id, 10));

  if (!feedback) {
    const err: AppError = new Error("Feedback not found");
    err.statusCode = 404;
    return next(err); // Delegates to errorHandler middleware
  }
  res.json(feedback);
};

// POST /api/feedbacks — creates a new feedback
// Expects JSON body: { "title": "..." }
export const createFeedback = (req: Request, res: Response): void => {
  const { stars, response, user_id, chapel_session_id, user, chapelSession } = req.body;
  const feedback: Feedback = {
    id: nextId++,
    stars: stars,
    response: response,
    user_id: user_id,
    chapel_session_id: chapel_session_id,
    user: user,
    chapelSession: chapelSession
  };
  feedbacks.push(feedback);
  res.status(201).json(feedback); // 201 Created
};

// PATCH /api/feedbacks/:id — partially updates a feedback
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateFeedback = (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): void => {
  const feedback = feedbacks.find((f) => f.id === parseInt(req.params.id, 10));
  if (!feedback) {
    const err: AppError = new Error("Feedback not found");
    err.statusCode = 404;
    return next(err);
  }
  // Only update fields that were provided
  if (req.body.stars !== undefined) feedback.stars = req.body.stars;
  if (req.body.response !== undefined) feedback.response = req.body.response;
  if (req.body.user_id !== undefined) feedback.user_id = req.body.user_id;
  if (req.body.chapel_session_id !== undefined) feedback.chapel_session_id = req.body.chapel_session_id;
  res.json(feedback);
};

// DELETE /api/feedbacks/:id — removes a feedback
export const deleteFeedback = (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): void => {
  const index = feedbacks.findIndex((f) => f.id === parseInt(req.params.id, 10));
  if (index === -1) {
    const err: AppError = new Error("Feedback not found");
    err.statusCode = 404;
    return next(err);
  }
  feedbacks.splice(index, 1);
  res.status(204).send(); // 204 No Content
};
