import { Request, Response } from "express";
import {prisma} from "../lib/prisma.js";

/* CREATE */
export const createSpeaker = async (
  req: Request,
  res: Response
) => {
  const speaker = await prisma.speaker.create({
    data: req.body,
  });

  res.status(201).json(speaker);
};

/* RETRIEVE */
export const getSpeakers = async (
  req: Request,
  res: Response
) => {
  const speakers = await prisma.speaker.findMany({
    include: {
      chapelSessions: true,
    },
  });

  res.json(speakers);
};

/* UPDATE */
export const updateSpeaker = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const updated = await prisma.speaker.update({
    where: { id: Number(id) },
    data: req.body,
  });

  res.json(updated);
};

/* DELETE */
export const deleteSpeaker = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await prisma.speaker.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};
