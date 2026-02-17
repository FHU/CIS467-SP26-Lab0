import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const createSpeaker = async (req: Request, res: Response) => {
  const { name } = req.body;

  const speaker = await prisma.speaker.create({
    data: {
      name,
    },
  });

  res.status(201).json(speaker);
};

export const getSpeakers = async (req: Request, res: Response) => {
  const speakers = await prisma.speaker.findMany({
    include: {
      chapelSessions: true,
    },
  });

  res.json(speakers);
};

export const getSpeakerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const speaker = await prisma.speaker.findUnique({
    where: { id: Number(id) },
    include: {
      chapelSessions: {
        include: {
          feedbacks: true,
        },
      },
    },
  });

  if (!speaker) {
    return res.status(404).json({ error: "Speaker not found" });
  }

  res.json(speaker);
};

export const updateSpeaker = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedSpeaker = await prisma.speaker.update({
    where: { id: Number(id) },
    data: req.body,
  });

  res.json(updatedSpeaker);
};

export const deleteSpeaker = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.speaker.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};
