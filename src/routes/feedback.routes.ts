import { Router } from "express";
import {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedback.controller.js";

const router = Router();

router.get("/chapel/:chapelId/feedback", getAllFeedback);
router.get("/chapel/:chapelId/feedback/:feedbackId", getFeedbackById);
router.post("/", createFeedback);
router.patch("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

export default router;
