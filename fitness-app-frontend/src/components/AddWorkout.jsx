import React, { useState } from "react";
import API from "../services/api.js";

const AddWorkout = ({ onWorkoutAdded }) => {
  const [form, setForm] = useState({
    workoutName: "",
    caloriesBurned: "",
    duration: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/workouts", form);
      alert("Workout logged!");
      setForm({ workoutName: "", caloriesBurned: "", duration: "" });
      if (onWorkoutAdded) onWorkoutAdded();
    } catch (error) {
      alert(`Error Logging Workout`);
    }
  };
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "100%",
        padding: "15px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <h3>Log New Workout</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="workoutName">Workout Name:</label>
          <input
            type="text"
            name="workoutName"
            id="workoutName"
            required
            value={form.workoutName}
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
        </div>

        <div>
          <label htmlFor="caloriesBurned">Calories Burned:</label>
          <input
            type="number"
            name="caloriesBurned"
            id="caloriesBurned"
            required
            value={form.caloriesBurned}
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
        </div>

        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            name="duration"
            id="duration"
            required
            value={form.duration}
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          Log Workout
        </button>
      </form>
    </div>
  );
};

export default AddWorkout;
