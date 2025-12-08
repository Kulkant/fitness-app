import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WorkoutFrequencyChart = ({ workouts }) => {
  //get last 7 days
  const last7Days = [...Array(7)]
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString(`en-IN`, {
        day: "numeric",
        month: "short",
      });
    })
    .reverse();

  //count workouts per day
  const workoutCount = last7Days.map((day) => {
    return workouts.filter((w) => {
      const workoutDate = new Date(w.date);
      return (
        workoutDate.toLocaleDateString(`en-IN`, {
          day: "numeric",
          month: "short",
        }) === day
      );
    }).length;
  });

  const data = {
    labels: last7Days,
    datasets: [
      {
        label: `Workout per day`,
        data: workoutCount,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
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
        text: `Workout frequency of last 7 days`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: `Number of workouts`,
        },
      },
      x: {
        title: {
          display: true,
          text: `Date`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default WorkoutFrequencyChart;
