import Workout from "../models/workout.js";

// create workout
export const createWorkout = async (req, res) => {
  try {
    const { userId, workoutName, caloriesBurned, duration, date } = req.body;

    const workout = await Workout.create({
      userId: req.user._id,
      workoutName,
      caloriesBurned,
      duration,
      date: date || new Date().toDateString(),
    });

    res.status(201).json({ workout });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get all workouts for logged-in users
export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id }).sort({
      date: -1,
    });

    res.json(workouts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update workout

export const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(400).json({ message: "Workout not found" });
    }

    //Check if  user owns the workout
    if (workout.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedWorkout);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//delete workout
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Workout.findByIdAndDelete(req.params.id);

    res.json({ message: "Workout deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
