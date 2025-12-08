import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement, Title, Tooltip, Legend } from "chart.js";

Chartjs.register(ArcElement, Title, Tooltip, Legend);

const NutritionChart = ({ meals }) => {
  //calcluate totals
  const totalProtein = meals.reduce(
    (sum, meal) => sum + (meal.protein || 0),
    0
  );
  const totalCarbs = meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
  const totalFats = meals.reduce((sum, meal) => sum + (meal.fats || 0), 0);

  const data = {
    labels: [`Protein`, `Carbs`, `Fats`],
    datasets: [
      {
        data: [totalProtein, totalCarbs, totalFats],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: `top`,
      },
      title: {
        display: true,
        text: `Nutrition Breakdown (Total grams)`,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || "";
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label} : ${value}g (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default NutritionChart;
