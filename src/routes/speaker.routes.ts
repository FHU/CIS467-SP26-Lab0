import { Router } from "express";
import {
  createSpeaker,
  getSpeakers,
  getSpeakerById,
  updateSpeaker,
  deleteSpeaker,
} from "../controllers/speaker.controller.js";

const router = Router();

router.post("/", createSpeaker);
router.get("/", getSpeakers);
router.get("/:id", getSpeakerById);
router.put("/:id", updateSpeaker);
router.delete("/:id", deleteSpeaker);

export default router;
