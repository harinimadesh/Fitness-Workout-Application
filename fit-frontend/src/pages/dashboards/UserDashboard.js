import React, { useEffect, useState } from "react";
import { Card, Stat } from "../../components/UI";
import { NavLink } from "react-router-dom";
import DietPieChart from "../../components/DietPieChart";
import WorkoutBarChart from "../../components/WorkoutBarChart";
import axios from "axios";

function UserDashboard({ auth }) {
  const [latestBmi, setLatestBmi] = useState("—");
  const [workoutStats, setWorkoutStats] = useState({ total: 0, done: 0 });
  const [dietPreview, setDietPreview] = useState([]);
  const [recentPhotos, setRecentPhotos] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;

    // ✅ BMI
    axios.get(`http://localhost:8080/api/bmi/user/${auth.id}`)
      .then(res => {
        if (res.data.length) {
          setLatestBmi(res.data[res.data.length - 1].bmi);
        } else {
          setLatestBmi("—");
        }
      })
      .catch(err => console.error("BMI fetch error:", err));

    // ✅ Workouts
    axios.get(`http://localhost:8080/api/workouts/user/${auth.id}`)
      .then(res => setWorkoutStats({
        total: res.data.length,
        done: res.data.filter(w => w.done).length
      }))
      .catch(err => console.error("Workout fetch error:", err));

    // ✅ Diets
    axios.get(`http://localhost:8080/api/diets/user/${auth.id}`)
      .then(res => setDietPreview(res.data.slice(0, 5)))
      .catch(err => console.error("Diet fetch error:", err));

    // ✅ Progress Photos
    axios.get(`http://localhost:8080/api/progress/user/${auth.id}`)
      .then(res => setRecentPhotos(res.data.slice(-3)))
      .catch(err => console.error("Progress fetch error:", err));

  }, [auth.id]);

  return (
    <div className="container">
      <h2>Hello, {auth.name}</h2>
      <div className="row" style={{ marginTop: 12 }}>
        <div className="col"><Stat label="Latest BMI" value={latestBmi} /></div>
        <div className="col"><Stat label="Workouts Completed" value={workoutStats.done} /></div>
        <div className="col"><Stat label="Assigned Workouts" value={workoutStats.total} /></div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div className="col">
          <Card title="Diet chart preview">
            <div className="list">
              {dietPreview.map(d => (
                <div className="list-item" key={d.id}>
                  <div><strong>{d.mealType}</strong> — {d.foodItem}</div>
                  <div>{d.calories} kcal</div>
                </div>
              ))}
              {!dietPreview.length && <div style={{ padding: 12 }}>No diet plans assigned.</div>}
            </div>
            <div style={{ marginTop: 12 }}>
              <NavLink to="/user/diets"><button>View diet chart</button></NavLink>
            </div>

            {/* ✅ Charts */}
            <div style={{ marginTop: 20 }}>
              <DietPieChart userId={auth.id} />
            </div>
            <div title="Workout Progress">
              <WorkoutBarChart userId={auth.id} />
            </div>
          </Card>
        </div>

        <div className="col">
          <Card title="Shortcuts">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <NavLink to="/user/workouts"><button>My Workouts</button></NavLink>
              <NavLink to="/user/diets"><button>My Diet</button></NavLink>
              <NavLink to="/user/progress"><button>Upload Progress</button></NavLink>
              <NavLink to="/user/bmi"><button>BMI Reports</button></NavLink>
            </div>
          </Card>

          <Card
            title="Recent progress"
            actions={<NavLink to="/user/progress"><button className="btn-secondary">View all</button></NavLink>}
          >
            <div className="row">
              {recentPhotos.map(p => (
                <div className="col" key={p.id}>
                  <div className="card">
                    {p.url ? (
                      <img src={p.url} alt={p.caption} style={{ width: "100%", borderRadius: 8 }} />
                    ) : (
                      <div className="helper">No preview</div>
                    )}
                    <div style={{ marginTop: 6 }}><strong>{p.caption}</strong></div>
                  </div>
                </div>
              ))}
              {!recentPhotos.length && <div className="helper">No photos yet.</div>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;