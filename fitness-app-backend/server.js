import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import protect from "./middlewares/auth.js";
import workoutRoutes from "./routes/workout.routes.js";
import mealRoutes from "./routes/meal.routes.js";
import roleCheck from "./middlewares/roleCheck.js";
import trainerRoutes from "./routes/trainer.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Fitness App is running");
});

app.get("/test", (req, res) => {
  res.send("Server & DB ok");
});

app.use(`/api/auth`, authRoutes);

app.get(`/api/test-protected`, protect, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/meals", mealRoutes);

//test admin only
app.get("/api/admin-only", protect, roleCheck(["admin"]), (req, res) => {
  res.send("Admin access granted");
});

//test trainer only
app.get("/api/trainer-only", protect, roleCheck(["trainer"]), (req, res) => {
  res.send("Trainer access granted");
});

app.use("/api/trainer", trainerRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running`);
});
