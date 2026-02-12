import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { UserType } from "../generated/prisma/enums.js";

// Extends the built-in Error to include an HTTP status code.
// The global error handler in middleware/errorHandler.ts reads this.
interface AppError extends Error {
  statusCode?: number;
}

// Type for route params — ensures req.params.id is typed as string
interface UserParams {
  id: string;
}

// GET /api/users — returns all users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  console.log("testing...")
  const u = await prisma.user.findMany();
  console.log(u);

  res.json(u);
};

// GET /api/users/:id — returns a single user by ID
// Uses next(err) to pass errors to the global error handler
export const getUserById = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id, 10) }
    });

    if (!user) {
      const err: AppError = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// POST /api/users — creates a new user
// Expects JSON body: { "title": "..." }
export const createUser = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  const { email, first_name, last_name, user_type } = req.body;

  if (!email || !first_name || !last_name || !user_type
      || !Object.values(UserType).includes(user_type))
  {
    const err: AppError = new Error("Invalid or missing fields");
    err.statusCode = 400;
    return next(err);
  }
  
  const user = await prisma.user.create({
    data: {
      email,
      first_name,
      last_name,
      user_type,
    }
  })

  res.status(201).json(user); // 201 Created
};

// PATCH /api/users/:id — partially updates a user
// Expects JSON body with optional fields: { "title"?, "completed"? }
export const updateUser = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id, 10) }
  })

  if (!user) {
    const err: AppError = new Error("User not found");
    err.statusCode = 404;
    return next(err);
  }

  if (req.body.email === undefined) {}

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(req.params.id, 10) },
    data: {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_type: req.body.user_type
    }
  })
  
  res.status(200).json(updatedUser)
};

// DELETE /api/users/:id — removes a user
export const deleteUser = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id, 10) }
  })

  if (!user) {
    const err: AppError = new Error("User not found");
    err.statusCode = 404;
    return next(err);
  }

  prisma.user.delete({
    where: { id: parseInt(req.params.id, 10) }
  })

  res.status(204).send(); // 204 No Content
};
