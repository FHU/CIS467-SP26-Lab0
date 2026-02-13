import { Request, Response } from "express";
import {prisma} from "../lib/prisma.js";

/* CREATE */
export const createUser = async (
  req: Request,
  res: Response
) => {
  const user = await prisma.user.create({
    data: req.body,
  });

  res.status(201).json(user);
};

/* RETRIEVE */
export const getUsers = async (
  req: Request,
  res: Response
) => {
  const users = await prisma.user.findMany({
    include: {
      feedbacks: {
        include: {
          chapelSession: {
            include: {
              speaker: true,
            },
          },
        },
      },
    },
  });

  res.json(users);
};

/* UPDATE */
export const updateUser = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const updated = await prisma.user.update({
    where: { id: Number(id) },
    data: req.body,
  });

  res.json(updated);
};

/* DELETE */
export const deleteUser = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};
