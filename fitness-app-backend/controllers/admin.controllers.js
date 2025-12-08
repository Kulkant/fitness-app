import User from "../models/user.js";
import Workout from "../models/workout.js";
import Meal from "../models/meal.js";

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update user role
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //delete user workout and meal also
    await Workout.findByIdAndDelete({ userId });
    await Meal.findByIdAndDelete({ userId });

    res.json({ message: "User all data deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getGymStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalWorkouts = await Workout.countDocuments();
    const totalMeals = await Meal.countDocuments();

    res.json({
      totalUsers,
      totalWorkouts,
      totalMeals,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
