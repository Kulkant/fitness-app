import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const WorkoutList = ({ workouts, onWorkoutDeleted }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm(`Delete this workout?`)) {
      try {
        await API.delete(`/workouts/${id}`);
        if (onWorkoutDeleted) onWorkoutDeleted();
      } catch (error) {
        alert(`Deletion failed`);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(`en-IN`, {
      day: "numeric",
      month: `short`,
      hour: `2-digit`,
      minute: `2-digit`,
    });
  };

  return (
    <div>
      <h3>Your Workouts.</h3>
      {workouts.length === 0 ? (
        <p>No workouts yet. Add your first one!</p>
      ) : (
        workouts.map((workout) => (
          <div
            key={workout._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ margin: 0 }}>{workout.workoutName}</h4>
              <span>{formatDate(workout.date)}</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span style={{ marginRight: "15px" }}>
                🔥 {workout.caloriesBurned} cal{" "}
              </span>
              <span>⏱️ {workout.duration} min</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => navigate(`/edit-workout/${workout._id}`)}
                style={{ marginRight: "10px", padding: "5px 15px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(workout._id)}
                style={{
                  padding: "5px 15px",
                  background: "#ff6b6b",
                  color: "white",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkoutList;
