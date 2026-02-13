import { Request, Response } from "express";
import {prisma} from "../lib/prisma.js";

/* CREATE */
export const createChapelSession = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, date, speakerId } = req.body;

    const session = await prisma.chapelSession.create({
      data: {
        title,
        date: new Date(date), // convert to Date object`
        speakerId: speakerId ?? null, // allow null
      },
    });

    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create chapel session" });
  }
};

/* RETRIEVE */
export const getChapelSessions = async (
  req: Request,
  res: Response
) => {
  const sessions = await prisma.chapelSession.findMany({
    include: {
      speaker: true,
    },
  });

  res.json(sessions);
};

/* UPDATE */
export const updateChapelSession = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { title, date, speakerId } = req.body;

    const updated = await prisma.chapelSession.update({
      where: { id: Number(id) },
      data: {
        title,
        date: date ? new Date(date) : undefined,
        speakerId: speakerId ?? null,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update chapel session" });
  }
};

/* DELETE */
export const deleteChapelSession = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await prisma.chapelSession.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};
