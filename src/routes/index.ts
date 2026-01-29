import { Router } from "express";
import healthRoutes from "./health.routes";
import tasksRoutes from "./tasks.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/tasks", tasksRoutes);

export default router;
