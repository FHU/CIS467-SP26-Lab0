import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, userType } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      userType,
    },
  });

  res.status(201).json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      feedbacks: true,
    },
  });

  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      feedbacks: {
        include: {
          chapelSession: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedUser = await prisma.user.update({
    where: { id: Number(id) },
    data: req.body,
  });

  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};
