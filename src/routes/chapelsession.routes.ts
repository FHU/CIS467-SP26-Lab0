import { Router } from "express";
import {
  createChapelSession,
  getChapelSessions,
  updateChapelSession,
  deleteChapelSession,
} from "../controllers/chapelsession.controller.js";

const router = Router();

router.post("/", createChapelSession);
router.get("/", getChapelSessions);
router.put("/:id", updateChapelSession);
router.delete("/:id", deleteChapelSession);

export default router;
