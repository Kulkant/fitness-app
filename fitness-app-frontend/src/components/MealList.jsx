import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const MealList = ({ meals, onMealDeleted }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      if (window.confirm(`Delete this meal?`)) {
        await API.delete(`/meals/${id}`);
        if (onMealDeleted) onMealDeleted();
      }
    } catch (error) {
      alert(`Meal Delete Failed`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <h3>Your meals.</h3>
      {meals.length === 0 ? (
        <p>No meals yet. Add your first one!</p>
      ) : (
        meals.map((meal) => (
          <div
            key={meal._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ margin: 0 }}>
                {meal.mealName} <span>{formatDate(meal.date)}</span>
              </h4>
            </div>
            <div style={{ marginTop: "10px", display: "flex", gap: "15px" }}>
              <span>🔥 {meal.calories} cal</span>
              <span>💪🏻 {meal.protein} g protein</span>
              <span>🌾 {meal.carbs} carbs</span>
              <span>🥑 {meal.fats} fats</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => navigate(`/edit-meal/${meal._id}`)}
                style={{ marginRight: "10px", padding: "5px 15px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(meal._id)}
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

export default MealList;
