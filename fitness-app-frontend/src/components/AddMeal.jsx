import React, { useState } from "react";
import API from "../services/api";

const AddMeal = ({ onMealAdded }) => {
  const [form, setform] = useState({
    mealName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/meals", form);
      alert(`Meal Logged`);
      setform({ mealName: "", calories: "", protein: "", carbs: "", fats: "" });
      if (onMealAdded) onMealAdded();
    } catch (error) {
      alert(`Error Logging Meal`);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h3>Log New Meal</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mealName">Meal Name:</label>
          <input
            type="text"
            name="mealName"
            id="mealName"
            placeholder="Meal Name"
            value={form.mealName}
            onChange={(e) => setform({ ...form, mealName: e.target.value })}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            required
          />
        </div>

        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            name="calories"
            id="calories"
            placeholder="Calories"
            value={form.calories}
            onChange={(e) => setform({ ...form, calories: e.target.value })}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            required
          />
        </div>

        <div>
          <label htmlFor="protein">Protein:</label>
          <input
            type="number"
            name="protein"
            id="protein"
            placeholder="Protein"
            value={form.protein}
            onChange={(e) => setform({ ...form, protein: e.target.value })}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            required
          />
        </div>

        <div>
          <label htmlFor="carbs">Carbs:</label>
          <input
            type="number"
            name="carbs"
            id="carbs"
            placeholder="Carbs"
            value={form.carbs}
            onChange={(e) => setform({ ...form, carbs: e.target.value })}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            required
          />
        </div>

        <div>
          <label htmlFor="fats">Fats:</label>
          <input
            type="number"
            name="fats"
            id="fats"
            placeholder="fats"
            value={form.fats}
            onChange={(e) => setform({ ...form, fats: e.target.value })}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
            required
          />
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          Log Meal
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
