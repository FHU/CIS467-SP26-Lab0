import { Request, Response } from "express";
import {prisma} from "../lib/prisma.js";


export const createFeedback = async (
  req: Request,
  res: Response
) => {
  const { title, content, published, authorId, chapelSessionId } = req.body;


  if (chapelSessionId) {
    const sessionExists = await prisma.chapelSession.findUnique({
      where: { id: chapelSessionId },
    });

    if (!sessionExists) {
      return res.status(400).json({
        error: "Chapel session does not exist",
      });
    }
  }

  const feedback = await prisma.feedback.create({
    data: {
      title,
      content,
      published,
      authorId,
      chapelSessionId,
    },
  });

  res.status(201).json(feedback);
};

export const getFeedback = async (
  req: Request,
  res: Response
) => {
  const feedback = await prisma.feedback.findMany({
    include: {
      author: true,
      chapelSession: {
        include: {
          speaker: true,
        },
      },
    },
  });

  res.json(feedback);
};


export const updateFeedback = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const updatedFeedback = await prisma.feedback.update({
    where: { id: Number(id) },
    data: req.body,
  });

  res.json(updatedFeedback);
};


export const deleteFeedback = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await prisma.feedback.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};
export const getFeedbackById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const feedback = await prisma.feedback.findUnique({
    where: { id: Number(id) },
    include: {
      author: true,
      chapelSession: {
        include: {
          speaker: true,
        },
      },
    },
  });

  if (!feedback) {
    return res.status(404).json({ error: "Feedback not found" });
  }

  res.json(feedback);
};