import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getGymStats,
} from "../controllers/admin.controllers.js";
import protect from "../middlewares/auth.js";
import roleCheck from "../middlewares/roleCheck.js";

const router = express.Router();

router.use(protect, roleCheck(["admin"])); //Strictly admin only

router.get("/users", getAllUsers);
router.patch("/users/:userId/update-role", updateUserRole);
router.delete("/users/:userId", deleteUser);
router.get("/stats", getGymStats);

export default router;
