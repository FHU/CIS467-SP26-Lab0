import { Router } from "express";
import {
  getAllSpeakers,
  getSpeakerById,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
} from "../controllers/speakers.controller.js";

const router = Router();

router.get("/", getAllSpeakers);
router.get("/:id", getSpeakerById);
router.post("/", createSpeaker);
router.patch("/:id", updateSpeaker);
router.delete("/:id", deleteSpeaker);
export default router;
