import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkoutBarChart from "../../components/WorkoutBarChart";

function UserWorkouts({ auth }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;
    axios.get(`http://localhost:8080/api/workouts/user/${auth.id}`)
      .then(res => setWorkouts(res.data))
      .catch(err => console.error("Error fetching workouts:", err));
  }, [auth.id]);

  const markDone = (id) => {
    axios.get(`http://localhost:8080/api/workouts/${id}`)
      .then(res => {
        const updatedWorkout = { ...res.data, done: true };
        return axios.post("http://localhost:8080/api/workouts", updatedWorkout);
      })
      .then(() => {
        // Refresh workouts after update
        return axios.get(`http://localhost:8080/api/workouts/user/${auth.id}`);
      })
      .then(res => setWorkouts(res.data))
      .catch(err => console.error("Error updating workout:", err));
  };

  return (
    <div className="container">
      <h2>My Workouts</h2>
      <div className="list" style={{ marginTop: 12 }}>
        {workouts.map(w => (
          <div className="list-item" key={w.id}>
            <div>
              <strong>{w.exercise}</strong>
              <div className="helper">{w.sets} sets × {w.reps} reps • {w.duration} min</div>
            </div>
            <div>
              {w.done ? (
                <span className="badge">Completed</span>
              ) : (
                <button className="btn-success" onClick={() => markDone(w.id)}>Mark Done</button>
              )}
            </div>
          </div>
        ))}
        <div title="Workout Progress">
          <WorkoutBarChart userId={auth.id} />
        </div>
        {!workouts.length && <div style={{ padding: 12 }}>No workouts assigned.</div>}
      </div>
    </div>
  );
}

export default UserWorkouts;