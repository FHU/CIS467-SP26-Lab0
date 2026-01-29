import { Router } from "express";
import healthRoutes from "./health.routes.js";
import tasksRoutes from "./tasks.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/tasks", tasksRoutes);


export default router;
