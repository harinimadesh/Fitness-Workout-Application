import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainerDietPlans({ auth }) {
  const [mealType, setMealType] = useState("breakfast");
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [clients, setClients] = useState([]);
  const [userBmi, setUserBmi] = useState(null);

  useEffect(() => {
    if (!auth?.id) return;
    // ✅ Load only mapped USER-role clients
    axios.get(`http://localhost:8080/api/users/trainer/${auth.id}`)
      .then(res => setClients(res.data.filter(c => c.role === "user" || c.role === "USER")))
      .catch(err => console.error("Error fetching clients:", err));
  }, [auth.id]);

  useEffect(() => {
    if (!assignedUser) return setUserBmi(null);
    axios.get(`http://localhost:8080/api/bmi/user/${assignedUser}`)
      .then(res => setUserBmi(res.data.length ? res.data[res.data.length - 1] : null))
      .catch(err => console.error("Error fetching user BMI:", err));
  }, [assignedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assignedUser) return alert("Select a user");
    const payload = {
      userId: Number(assignedUser),
      trainerId: auth.id,
      mealType,
      foodItem,
      calories: Number(calories),
    };
    axios.post("http://localhost:8080/api/diets", payload)
      .then(() => {
        setFoodItem(""); setCalories("");
        alert("Diet plan assigned and updated in user chart!");
      })
      .catch(err => {
        console.error("Error assigning diet:", err);
        alert("Failed to assign diet plan");
      });
  };

  return (
    <div className="container">
      <h2>Create Diet Plan</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <form onSubmit={handleSubmit}>
          <label>Assign to User</label>
          <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)}>
            <option value="">Select user</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
          </select>

          {userBmi && (
            <div className="helper" style={{ marginTop: 8 }}>
              Latest BMI: {userBmi.bmi} • Height: {userBmi.height} cm • Weight: {userBmi.weight} kg
            </div>
          )}

          <label>Meal Type</label>
          <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>

          <label>Food Item</label>
          <input value={foodItem} onChange={(e) => setFoodItem(e.target.value)} required />

          <label>Calories</label>
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />

          <div style={{ marginTop: 12 }}>
            <button type="submit">Create Diet Plan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TrainerDietPlans;