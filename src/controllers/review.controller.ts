import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { Review } from "../generated/prisma/client.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface ReviewParams {
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

// GET /api/reviews — returns all reviews
export const getAllReviews = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (e) {
    return next(e);
  }
};

// GET /api/reviews/:id — returns a single review by ID
export const getReviewById = async (
  req: Request<ReviewParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!review) {
      return next(createError("Review not found", 404));
    }
    res.json(review);
  } catch (e) {
    return next(e);
  }
};

// POST /api/reviews — creates a new review
// Expects JSON body: { "title": "..." }
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { stars, response, reviewer, reviewer_id, chapel_session, chapel_session_id } = req.body;

    const review: Review = await prisma.review.create({
      data: {
        stars: stars || 5,
        response: response || "No response",
        reviewer,
        reviewer_id,
        chapel_session,
        chapel_session_id,
      }
    });

    res.status(201).json(review);
  } catch (e) {
    return next(e);
  }
};

// PATCH /api/reviews/:id — partially updates a review
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateReview = async (
  req: Request<ReviewParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { stars, response, reviewer, reviewer_id, chapel_session, chapel_session_id } = req.body;

    const review = await prisma.review.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(stars !== undefined && { stars }),
        ...(response !== undefined && { response }),
        ...(reviewer !== undefined && { reviewer }),
        ...(reviewer_id !== undefined && { reviewer_id }),
        ...(chapel_session !== undefined && { chapel_session }),
        ...(chapel_session_id !== undefined && { chapel_session_id }),
      }
    });
    res.json(review);
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Review not found", 404));
    }
    return next(e);
  }
};

// DELETE /api/reviews/:id — removes a review
export const deleteReview = async (
  req: Request<ReviewParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.review.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (e) {
    if (isNotFoundError(e)) {
      return next(createError("Review not found", 404));
    }
    return next(e);
  }
};
