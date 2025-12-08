import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import { useNavigate, useParams } from "react-router-dom";

const EditMeal = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    mealName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(false);
      const response = await API.get(`/meals`);
      const meal = response.data.find((m) => m._id === id);
      if (meal) {
        setForm({
          mealName: meal.mealName,
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fats: meal.fats,
        });
      } else {
        alert(`Meal not found`);
        navigate(`/dashboard`);
      }
    } catch (error) {
      alert(`Error fetching meals`);
      navigate(`/dashbaord`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.patch(`/meals/${id}`, form);
      alert(`Meal Updated`);
      navigate(`/dashboard`);
    } catch (error) {
      alert(`Error Updating Meal`);
      navigate(`/dashboard`);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px" }}>
      <h2>Edit Meal</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mealName">Meal Name:</label>
          <input
            type="text"
            name="mealName"
            id="mealName"
            placeholder="Meal Name"
            required
            value={form.mealName}
            onChange={(e) => setForm({ ...form, mealName: e.target.value })}
            style={{ width: "100%", margin: "8px 0", padding: "10px" }}
          />
        </div>

        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            name="calories"
            id="calories"
            placeholder="Calories"
            required
            value={form.calories}
            onChange={(e) => setForm({ ...form, calories: e.target.value })}
            style={{ width: "100%", margin: "8px 0", padding: "10px" }}
          />
        </div>

        <div>
          <label htmlFor="protein">Protein:</label>
          <input
            type="number"
            name="protein"
            id="protein"
            placeholder="Protein"
            required
            value={form.protein}
            onChange={(e) => setForm({ ...form, protein: e.target.value })}
            style={{ width: "100%", margin: "8px 0", padding: "10px" }}
          />
        </div>

        <div>
          <label htmlFor="carbs">Carbs:</label>
          <input
            type="number"
            name="carbs"
            id="carbs"
            placeholder="Carbs"
            required
            value={form.carbs}
            onChange={(e) => setForm({ ...form, carbs: e.target.value })}
            style={{ width: "100%", margin: "8px 0", padding: "10px" }}
          />
        </div>

        <div>
          <label htmlFor="fats">Fats:</label>
          <input
            type="number"
            name="fats"
            id="fats"
            placeholder="Fats"
            required
            value={form.fats}
            onChange={(e) => setForm({ ...form, fats: e.target.value })}
            style={{ width: "100%", margin: "8px 0", padding: "10px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "12px",
              background: "#4CAF50",
              color: "white",
            }}
          >
            Update Meal
          </button>
          <button
            type="button"
            onClick={() => navigate(`/dashboard`)}
            style={{ flex: 1, padding: "12px", background: "#ccc" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMeal;
