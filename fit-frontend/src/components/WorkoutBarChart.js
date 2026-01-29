import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function WorkoutBarChart({ userId }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:8080/api/workouts/user/${userId}`)
      .then(res => setWorkouts(res.data))
      .catch(err => console.error("Error fetching workouts:", err));
  }, [userId]);

  // Group workouts by exercise name
  const grouped = workouts.reduce((acc, w) => {
    acc[w.exercise] = (acc[w.exercise] || 0) + (w.reps || 0);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Total Reps",
        data: Object.values(grouped),
        backgroundColor: "#36A2EB",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Workout Progress (Reps per Exercise)",
        color: "#333",
        font: { size: 16, weight: "bold" }
      }
    },
    scales: {
      x: { ticks: { color: "#555" }, grid: { display: false } },
      y: { ticks: { color: "#555" }, beginAtZero: true }
    }
  };

  return (
    <div style={{
      width: "100%", maxWidth: "500px", height: "300px",
      margin: "20px auto", padding: "12px",
      border: "1px solid #ddd", borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      {workouts.length ? (
        <Bar data={chartData} options={options} />
      ) : (
        <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
          No workout data available.
        </div>
      )}
    </div>
  );
}

export default WorkoutBarChart;