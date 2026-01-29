import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainerWorkouts({ auth }) {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [clients, setClients] = useState([]);
  const [userBmi, setUserBmi] = useState(null);

  useEffect(() => {
    if (!auth?.id) return;
    // ✅ Load mapped clients and filter to USER role only
    axios.get(`http://localhost:8080/api/users/trainer/${auth.id}`)
      .then(res => {
        const userClients = res.data.filter(c => c.role === "user" || c.role === "USER");
        setClients(userClients);
      })
      .catch(err => console.error("Error fetching clients:", err));
  }, [auth.id]);

  useEffect(() => {
    if (!assignedUser) return setUserBmi(null);
    // ✅ Fetch latest BMI for selected user
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
      exercise,
      sets: Number(sets),
      reps: Number(reps),
      duration: Number(duration) || 0,
      done: false,
    };

    axios.post("http://localhost:8080/api/workouts", payload)
      .then(() => {
        setExercise(""); setSets(""); setReps(""); setDuration("");
        alert("Workout assigned!");
      })
      .catch(err => {
        console.error("Error assigning workout:", err);
        alert("Failed to assign workout");
      });
  };

  return (
    <div className="container">
      <h2>Create Workout Routine</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <form onSubmit={handleSubmit}>
          <label>Assign to User</label>
          <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)}>
            <option value="">Select user</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>

          {userBmi && (
            <div className="helper" style={{ marginTop: 8 }}>
              Latest BMI: {userBmi.bmi} • Height: {userBmi.height} cm • Weight: {userBmi.weight} kg
            </div>
          )}

          <label>Exercise</label>
          <input value={exercise} onChange={(e) => setExercise(e.target.value)} required />

          <div className="row">
            <div className="col">
              <label>Sets</label>
              <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} required />
            </div>
            <div className="col">
              <label>Reps</label>
              <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} required />
            </div>
            <div className="col">
              <label>Duration (min)</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <button type="submit">Create Workout</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TrainerWorkouts;