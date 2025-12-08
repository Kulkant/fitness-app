import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import API from "../services/api.js";
import AddWorkout from "./AddWorkout.jsx";
import WorkoutList from "./WorkoutList.jsx";
import AddMeal from "./AddMeal.jsx";
import MealList from "./MealList.jsx";
import { useNavigate } from "react-router-dom";
import CaloriesChart from "./CaloriesChart.jsx";
import WorkoutFrequencyChart from "./WorkoutFrequencyChart.jsx";
import {
  FaUser,
  FaFire,
  FaUtensils,
  FaChartBar,
  FaDumbbell,
  FaCalendarAlt,
} from "react-icons/fa";
import "./dashboard.css";
import NutritionChart from "./NutritionChart.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const [workoutRes, mealRes] = await Promise.all([
        API.get("/workouts"),
        API.get("/meals"),
      ]);
      setWorkouts(workoutRes.data);
      setMeals(mealRes.data);
    } catch (error) {
      console.log(`Error fetching data :`, error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
        <p className="loadingText">Loading your fitness dashboard...</p>
      </div>
    );
  }

  const handleWorkoutAdded = () => {
    setRefresh(!refresh);
    fetchData();
  };

  const handleMealAdded = () => {
    setRefresh(!refresh);
    fetchData();
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const caloriePercentage = Math.min((totalCalories / 2500) * 100, 100);
  const getCalorieBarColor = () => {
    if (totalCalories > 2000) return "#ef4444";
    if (totalCalories > 1500) return "#f59e0b";
    return "#10b981";
  };

  return (
    <div className="dashboardContainer">
      {/* Header */}
      <header className="header">
        <div className="headerLeft">
          <h1 className="greeting">Welcome back, {user?.name}!</h1>
          <p className="date">
            <FaCalendarAlt style={{ marginRight: 8 }} />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button onClick={() => navigate(`/profile`)} className="profileButton">
          <FaUser style={{ marginRight: 8 }} />
          View Profile
        </button>
      </header>

      {/* Stats Cards */}
      <div className="statsContainer">
        <div className="statCard">
          <div className="statIconContainer">
            <FaDumbbell className="statIcon" />
          </div>
          <div className="statContent">
            <h3 className="statNumber">{workouts.length}</h3>
            <p className="statLabel">Total Workouts</p>
          </div>
        </div>

        <div className="statCard">
          <div className="statIconContainer">
            <FaUtensils className="statIcon" />
          </div>
          <div className="statContent">
            <h3 className="statNumber">{meals.length}</h3>
            <p className="statLabel">Total Meals</p>
          </div>
        </div>

        <div className="statCard">
          <div className="statIconContainer">
            <FaFire className="statIcon" />
          </div>
          <div className="statContent">
            <h3 className="statNumber">{totalCalories}</h3>
            <p className="statLabel">Total Calories</p>
          </div>
        </div>

        <div className="statCard">
          <div className="statIconContainer">
            <FaChartBar className="statIcon" />
          </div>
          <div className="statContent">
            <h3 className="statNumber">
              {meals.length > 0 ? Math.round(totalCalories / meals.length) : 0}
            </h3>
            <p className="statLabel">Avg. per Meal</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="contentGrid">
        {/* Left Column */}
        <div className="leftColumn">
          <div className="sectionCard">
            <div className="sectionHeader">
              <FaDumbbell className="sectionIcon" />
              <h2 className="sectionTitle">Recent Workouts</h2>
            </div>
            <WorkoutList workouts={workouts} onWorkoutDeleted={fetchData} />
          </div>

          <div className="sectionCard">
            <div className="sectionHeader">
              <FaUtensils className="sectionIcon" />
              <h2 className="sectionTitle">Recent Meals</h2>
            </div>
            <MealList meals={meals} onMealDeleted={fetchData} />
          </div>
        </div>

        {/* Right Column */}
        <div className="rightColumn">
          {/* Quick Actions */}
          <div className="actionsCard">
            <h2 className="actionsTitle">Quick Actions</h2>
            <div className="actionsGrid">
              <AddWorkout onWorkoutAdded={handleWorkoutAdded} />
              <AddMeal onMealAdded={handleMealAdded} />
            </div>
          </div>

          {/* Summary Card */}
          <div className="summaryCard">
            <h2 className="summaryTitle">Today's Summary</h2>
            <div className="summaryStats">
              <div className="summaryItem">
                <div className="summaryNumber">{workouts.length}</div>
                <div className="summaryLabel">Workouts</div>
              </div>
              <div className="summaryItem">
                <div className="summaryNumber">{meals.length}</div>
                <div className="summaryLabel">Meals</div>
              </div>
              <div className="summaryItem">
                <div className="summaryNumber">{totalCalories}</div>
                <div className="summaryLabel">Calories</div>
              </div>
            </div>

            {totalCalories > 0 && (
              <div>
                <div className="calorieBar">
                  <div
                    className="calorieFill"
                    style={{
                      width: `${caloriePercentage}%`,
                      backgroundColor: getCalorieBarColor(),
                    }}
                  />
                </div>
                <div className="calorieText">
                  {totalCalories} / 2500 recommended daily calories
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <CaloriesChart workouts={workouts} />
      <WorkoutFrequencyChart workouts={workouts} />
      <NutritionChart meals={meals} />
    </div>
  );
};

export default Dashboard;
