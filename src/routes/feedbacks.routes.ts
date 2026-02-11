import { Router } from "express";
import {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbacks.controller.js";

const router = Router();

router.get("/", getAllFeedbacks);
router.get("/:id", getFeedbackById);
router.post("/", createFeedback);
router.patch("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

export default router;