import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CaloriesChart = ({ workouts }) => {
  const last7Days = [...Array(7)]
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString("en-IN", { weekday: "short" });
    })
    .reverse();

  const caloriesData = last7Days.map((day) => {
    return workouts
      .filter(
        (w) =>
          new Date(w.date).toLocaleDateString(`en-In`, { weekday: `short` }) ===
          day
      )
      .reduce((sum, w) => sum + w.caloriesBurned, 0);
  });

  const data = {
    labels: last7Days,
    datasets: [
      {
        label: `Calories Burned`,
        data: caloriesData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: `a`,
      },
      title: {
        display: true,
        text: `Weekly calories burned`,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default CaloriesChart;
