import User from "../models/user.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, age, weight } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        age,
        weight,
      },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
