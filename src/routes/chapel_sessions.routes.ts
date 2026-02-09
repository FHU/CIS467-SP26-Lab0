import { Router } from "express";
import {
  getAllChapelSessions,
  getChapelSessionById,
  createChapelSession,
  updateChapelSession,
  deleteChapelSession,
} from "../controllers/chapel_session.controller.js";

const router = Router();

router.get("/", getAllChapelSessions);
router.get("/:id", getChapelSessionById);
router.post("/", createChapelSession);
router.patch("/:id", updateChapelSession);
router.delete("/:id", deleteChapelSession);

export default router;
