import express from "express";
import {
  createWorkout,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workout.controllers.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

router.use(protect); // All routes should be protected - user should be logged in

router.get("/", getAllWorkouts);
router.post("/", createWorkout);
router.patch("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;
