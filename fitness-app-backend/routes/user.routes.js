import express from "express";
import { updateProfile } from "../controllers/user.controllers.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.patch("/profile", updateProfile);

export default router;
