import { Router } from "express";
import {
  createChapelSession,
  getChapelSessions,
  getChapelSessionById,
  updateChapelSession,
  deleteChapelSession,
} from "../controllers/chapelsession.controller.js";

const router = Router();

router.post("/", createChapelSession);
router.get("/", getChapelSessions);
router.get("/:id", getChapelSessionById);
router.put("/:id", updateChapelSession);
router.delete("/:id", deleteChapelSession);

export default router;
