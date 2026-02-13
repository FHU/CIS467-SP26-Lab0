import { Router } from "express";
import healthRoutes from "./health.routes.js";
import userRoutes from "./user.routes.js";
import speakerRoutes from "./speaker.routes.js";
import chapelSessionRoutes from "./chapelSessions.routes.js";
import feedBack from "./feedback.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/tasks", userRoutes);
router.use("/speakers", speakerRoutes);
router.use("/chapel-sessions", chapelSessionRoutes);
router.use("/feedback", feedBack);


export default router;
