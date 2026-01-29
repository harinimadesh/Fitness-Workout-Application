import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function DietPieChart({ userId }) {
  const [dietData, setDietData] = useState([]);

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:8080/api/diets/user/${userId}`)
      .then(res => setDietData(res.data))
      .catch(err => console.error("Error fetching diet data:", err));
  }, [userId]);

  // Group calories by mealType
  const grouped = dietData.reduce((acc, item) => {
    acc[item.mealType] = (acc[item.mealType] || 0) + item.calories;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        data: Object.values(grouped),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56",
          "#4BC0C0", "#9966FF", "#FF9F40"
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#333", font: { size: 14 } }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} kcal (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{
      width: "100%", maxWidth: "400px", height: "300px",
      margin: "20px auto", padding: "12px",
      border: "1px solid #ddd", borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h3 style={{ textAlign: "center", marginBottom: "12px" }}>Diet Plan Calories</h3>
      {dietData.length ? (
        <Pie data={chartData} options={options} />
      ) : (
        <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
          No diet data available.
        </div>
      )}
    </div>
  );
}

export default DietPieChart;