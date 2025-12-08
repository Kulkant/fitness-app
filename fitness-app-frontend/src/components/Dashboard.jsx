import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

// Components
import AddWorkout from "./AddWorkout";
import WorkoutList from "./WorkoutList";
import AddMeal from "./AddMeal";
import MealList from "./MealList";
import CaloriesChart from "./CaloriesChart";
import WorkoutFrequencyChart from "./WorkoutFrequencyChart";
import NutritionChart from "./NutritionChart";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const [workoutsRes, mealsRes] = await Promise.all([
        API.get("/workouts"),
        API.get("/meals"),
      ]);
      setWorkouts(workoutsRes.data);
      setMeals(mealsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading your fitness data...
      </div>
    );

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Welcome back, {user?.name}!</h1>
          <p style={{ margin: "5px 0 0 0", color: "#666" }}>
            Track your fitness journey • {workouts.length} workouts •{" "}
            {meals.length} meals logged
          </p>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => navigate("/profile")}
            style={{
              padding: "10px 20px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Edit Profile
          </button>
          <button
            onClick={() => {
              navigate(`/login`);
            }}
            style={{
              padding: "10px 20px",
              background: "#f5f5f5",
              color: "#333",
              border: "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Total Workouts</h3>
          <p style={{ fontSize: "32px", margin: 0, fontWeight: "bold" }}>
            {workouts.length}
          </p>
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Total Meals</h3>
          <p style={{ fontSize: "32px", margin: 0, fontWeight: "bold" }}>
            {meals.length}
          </p>
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Calories Today</h3>
          <p style={{ fontSize: "32px", margin: 0, fontWeight: "bold" }}>
            {meals
              .filter((m) => {
                const today = new Date().toDateString();
                return new Date(m.date).toDateString() === today;
              })
              .reduce((sum, meal) => sum + meal.calories, 0)}
          </p>
        </div>
        <div
          style={{
            background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Your Role</h3>
          <p
            style={{
              fontSize: "32px",
              margin: 0,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {user?.role}
          </p>
        </div>
      </div>

      {/* Analytics Section */}
      <div style={{ marginTop: "40px" }}>
        <h2>Your Analytics</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          {/* Calories Chart */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #eaeaea",
            }}
          >
            <CaloriesChart workouts={workouts} />
          </div>

          {/* Workout Frequency */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #eaeaea",
            }}
          >
            <WorkoutFrequencyChart workouts={workouts} />
          </div>

          {/* Nutrition Chart */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #eaeaea",
            }}
          >
            <NutritionChart meals={meals} />
          </div>
        </div>
      </div>

      {/* Workout & Meal Logging */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "30px",
          marginTop: "40px",
        }}
      >
        {/* Left Column - Workouts */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h2 style={{ margin: 0 }}>Workouts</h2>
            <button
              onClick={() => navigate("/add-workout")}
              style={{
                padding: "8px 16px",
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              + Add New
            </button>
          </div>
          <AddWorkout onWorkoutAdded={handleRefresh} />
          <div style={{ marginTop: "20px" }}>
            <WorkoutList workouts={workouts} onWorkoutDeleted={handleRefresh} />
          </div>
        </div>

        {/* Right Column - Meals */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h2 style={{ margin: 0 }}>Meals</h2>
            <button
              onClick={() => navigate("/add-meal")}
              style={{
                padding: "8px 16px",
                background: "#FF9800",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              + Add New
            </button>
          </div>
          <AddMeal onMealAdded={handleRefresh} />
          <div style={{ marginTop: "20px" }}>
            <MealList meals={meals} onMealDeleted={handleRefresh} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          textAlign: "center",
          color: "#888",
          borderTop: "1px solid #eee",
        }}
      >
        <p>
          Fitness Tracker • Built with MERN Stack • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
