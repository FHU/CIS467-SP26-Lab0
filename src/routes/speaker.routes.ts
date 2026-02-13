import { Router } from "express";
import {
  createSpeaker,
  getSpeakers,
  updateSpeaker,
  deleteSpeaker,
} from "../controllers/speaker.controller.js";

const router = Router();

router.post("/", createSpeaker);
router.get("/", getSpeakers);
router.put("/:id", updateSpeaker);
router.delete("/:id", deleteSpeaker);

export default router;
