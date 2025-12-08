import express from "express";
import {
  createMeal,
  getUserMeals,
  updateMeal,
  deleteMeal,
} from "../controllers/meal.controllers.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

router.use(protect); // All routes are protected - all users should be logged in first

router.get("/", getUserMeals);
router.post("/", createMeal);
router.patch("/:id", updateMeal);
router.delete("/:id", deleteMeal);

export default router;
