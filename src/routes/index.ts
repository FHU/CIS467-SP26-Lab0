import { Router } from "express";
import taskRoutes from "./tasks.routes.js";
import feedbackRoutes from "./feedback.routes.js";
import chapelSessionRoutes from "./chapelsession.routes.js";
import speakerRoutes from "./speaker.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.use("/feedback", feedbackRoutes);
router.use("/chapel-sessions", chapelSessionRoutes);
router.use("/speakers", speakerRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;
