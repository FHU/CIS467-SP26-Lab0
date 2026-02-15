import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

interface AppError extends Error {
  statusCode?: number;
}

interface UserParams {
    id: string;
}

// Get all users
export const getAllUsers = async (
    req: Request,
    res: Response)
    :Promise<void> => {
        console.log("testing");
        const t = await prisma.uSER.findMany()
        console.log(t);

        res.json(t);
}

export const getUserById = async (
    req: Request<UserParams>,
    res: Response,
    next: NextFunction,
   ): Promise<void> => {
  try {
    const user = await prisma.uSER.findUnique({
        where: {id: parseInt(req.params.id, 10)}
    })
    if (!user) {
      const err: AppError = new Error("User not found");
      err.statusCode = 404;
      return next(err); // Delegates to errorHandler middleware
    }
    res.json(user);
  }
  catch (error){
    next (error);
  }

    }

// Create user
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { first_name, last_name, email, type } = req.body;
    
    const user = await prisma.uSER.create({
      data: {
        first_name: first_name || null,
        last_name: last_name || null,
        email: email,
        type: type,
      },
    });
    
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

//Update User
export const updateUser = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
    const user = await prisma.uSER.findUnique({
            where: { id: parseInt(req.params.id, 10) }
        });
  if (!user) {
    const err: AppError = new Error("User not found");
    err.statusCode = 404;
    return next(err);
  }
  // Only update fields that were provided
  if (req.body.id !== undefined) user.id = req.body.id;
  if (req.body.first_name !== undefined) user.first_name = req.body.first_name;
  if (req.body.last_name !== undefined) user.last_name = req.body.last_name;
  if (req.body.type !== undefined) user.type = req.body.type;
  res.json(user);
};

// Delete users
export const deleteUser = async (
  req: Request<UserParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await prisma.uSER.delete({
      where: { id: parseInt(req.params.id, 10) }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
