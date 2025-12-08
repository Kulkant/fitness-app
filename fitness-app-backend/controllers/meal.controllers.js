import Meal from "../models/meal.js";

//create meal
export const createMeal = async (req, res) => {
  try {
    const { userId, mealName, calories, protein, carbs, fats, date } = req.body;

    const meal = await Meal.create({
      userId: req.user._id,
      mealName,
      calories,
      protein,
      carbs,
      fats,
      date: new Date().toDateString(),
    });

    res.status(201).json({ meal });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(meals);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    if (meal.userId.toString() !== req.user._id.toString()) {
      return res.json({ message: "Not authorized" });
    }

    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedMeal);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.json({ message: "Meal not found" });
    }

    if (meal.userId.toString() !== req.user._id.toString()) {
      return res.json({ message: "Not authorized" });
    }

    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
