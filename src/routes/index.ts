import { Router } from "express";
import healthRoutes from "./health.routes.js";
import tasksRoutes from "./tasks.routes.js";
import usersRoutes from "./users.routes.js";
import speakersRoutes from "./speakers.routes.js";
import feedbacksRoutes from "./feedbacks.routes.js";
import chapelSessionsRoutes from "./chapel-sessions.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/tasks", tasksRoutes);
router.use("/users", usersRoutes);
router.use("/speakers", speakersRoutes);
router.use("/feedbacks", feedbacksRoutes);
router.use("/chapel-sessions", chapelSessionsRoutes);

export default router;