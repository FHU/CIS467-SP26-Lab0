import { Router } from "express";
import healthRoutes from "./health.routes.js";
import feedbackRoutes from "./feedbacks.routes.js";
import usersRoutes from "./users.routes.js";
import chapelsessionsRoutes from "./chapelsessions.routes.js";
import speakersRoutes from "./speakers.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/chapelsessions", chapelsessionsRoutes);
router.use("/users", usersRoutes);
router.use("/speakers", speakersRoutes);


export default router;
