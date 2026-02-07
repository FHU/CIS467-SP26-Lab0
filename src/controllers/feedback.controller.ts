import { Request, Response, NextFunction, response } from "express";
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
  stars: number;
  response: string;
  user_id: number;
  chapel_session_id: number
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

// GET /api/tasks — returns all tasks
export const getAllFeedback = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const feedback = await prisma.feedback.findMany();
    res.json(feedback);
  } catch (e) {
    return next(e);
  }
};

// GET /api/tasks/:id — returns a single task by ID
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

// POST /api/tasks — creates a new task
// Expects JSON body: { "title": "..." }
export const createFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, stars, response, user_id, chapel_session_id} = req.body;

    const feedback: Feedback = await prisma.feedback.create({
      data: {
      id: id,
      stars: stars,
      response: response,
      user_id: user_id,
      chapel_session_id: chapel_session_id 
      }
    });

    res.status(201).json(feedback);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/tasks/:id — partially updates a task
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateFeedback = async (
  req: Request<FeedbackParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, email, first_name, last_name } = req.body;

    const feedback = await prisma.feedback.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(id !== undefined && { id }),
        ...(email !== undefined && { email }),
        ...(first_name !== undefined && { id }),
        ...(last_name !== undefined && { email })
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

// DELETE /api/tasks/:id — removes a task
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
