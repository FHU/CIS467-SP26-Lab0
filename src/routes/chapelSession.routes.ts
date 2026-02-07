import { Router } from "express";
import {
  getAllchapelSessions,
  getChapelSessionById,
  createChapelSession,
  updateChapelSession,
  deleteChapelSession,
} from "../controllers/chapelSession.controller.js";

const router = Router();

router.get("/", getAllchapelSessions);
router.get("/:id", getChapelSessionById);
router.post("/", createChapelSession);
router.patch("/:id", updateChapelSession);
router.delete("/:id", deleteChapelSession);

export default router;
