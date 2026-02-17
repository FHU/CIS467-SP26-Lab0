import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const createChapelSession = async (req: Request, res: Response) => {
  const { title, date, speakerId } = req.body;

  const session = await prisma.chapelSession.create({
    data: {
      title,
      date: new Date(date),
      speakerId,
    },
  });

  res.status(201).json(session);
};

export const getChapelSessions = async (req: Request, res: Response) => {
  const sessions = await prisma.chapelSession.findMany({
    include: {
      speaker: true,
      feedbacks: true,
    },
  });

  res.json(sessions);
};

export const getChapelSessionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const session = await prisma.chapelSession.findUnique({
    where: { id: Number(id) },
    include: {
      speaker: true,
      feedbacks: {
        include: {
          author: true,
        },
      },
    },
  });

  if (!session) {
    return res.status(404).json({ error: "Chapel session not found" });
  }

  res.json(session);
};

export const updateChapelSession = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedSession = await prisma.chapelSession.update({
    where: { id: Number(id) },
    data: req.body,
  });

  res.json(updatedSession);
};

export const deleteChapelSession = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.chapelSession.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};
