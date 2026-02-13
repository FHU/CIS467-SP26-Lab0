import { Router } from "express";
import healthRoutes from "./health.routes.js";
import tasksRoutes from "./user.routes.js";
import feedbackRoutes from "./feedback.routes.js"
import userRoutes from "./user.routes.js"
import speakerRoutes from "./speaker.routes.js"
import chapelSessionRoutes from "./chapelSession.routes.js"

const router = Router();

router.use("/health", healthRoutes);
router.use("/tasks", tasksRoutes);
router.use("/feedback", feedbackRoutes)
router.use("/users", userRoutes)
router.use("/speakers", speakerRoutes)
router.use("/chapelsessions", chapelSessionRoutes)


export default router;
