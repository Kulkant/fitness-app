import express from "express";
import protect from "../middlewares/auth.js";
import roleCheck from "../middlewares/roleCheck.js";
import {
  assignWorkout,
  getAllUsers,
  getUserWorkouts,
} from "../controllers/trainer.controllers.js";

const router = express.Router();

router.use(protect, roleCheck(["admin", "trainer"])); // only admin & trainer

router.post("/assign-workout", assignWorkout);
router.get("/users", getAllUsers);
router.get("/users/:userId/workouts", getUserWorkouts);

export default router;
