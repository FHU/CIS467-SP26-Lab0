import { Router } from "express";
import healthRoutes from "./health.routes.js";
import tasksRoutes from "./tasks.routes.js";
import usersRoutes from "./user.routes.js"
import speakerRoutes from "./speaker.routes.js"
import feedbackRoutes from "./feedback.routes.js"
import chapelRoutes from "./chapel_sessions.routes.js"


const router = Router();

router.use("/health", healthRoutes);
router.use("/tasks", tasksRoutes);
router.use("/users", usersRoutes)
router.use("/speakers", speakerRoutes)
router.use("/feedback", feedbackRoutes)
router.use("/chapel", chapelRoutes)


export default router;
