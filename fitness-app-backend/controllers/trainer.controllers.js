import User from "../models/user.js";
import Workout from "../models/workout.js";

//assign workout to the user
export const assignWorkout = async (req, res) => {
  try {
    const { userId, workoutName, caloriesBurned, duration, date } = req.body;

    //check if user exits
    const user = await User.findById(userId);
    if (!user) {
      return res.status().json({ message: "User not found" });
    }

    const workout = await Workout.create({
      userId,
      workoutName,
      caloriesBurned,
      duration,
      date: date || new Date(),
      assignedBy: req.user._id, //Track who assigned it
    });

    res.status(201).json(workout);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get all users (for trainer dashboard)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role age weight");

    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get all workouts assigned to a specific user
export const getUserWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.id });

    res.json(workouts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
