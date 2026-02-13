import { Router } from "express";
import {
  getAllUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUsersById);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
