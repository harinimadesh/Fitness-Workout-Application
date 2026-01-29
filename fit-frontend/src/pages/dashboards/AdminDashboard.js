import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../components/UI";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [diets, setDiets] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // ✅ Fetch only user-role accounts
    axios.get("http://localhost:8080/api/users/role/user").then(res => setUsers(res.data));
    // ✅ Fetch only trainer-role accounts
    axios.get("http://localhost:8080/api/users/role/trainer").then(res => setTrainers(res.data));
    axios.get("http://localhost:8080/api/workouts").then(res => setWorkouts(res.data));
    axios.get("http://localhost:8080/api/diets").then(res => setDiets(res.data));
    // ✅ Fetch all trainer–user mappings for admin
    axios.get("http://localhost:8080/api/trainer-clients/all").then(res => setMappings(res.data));
  }, []);

  const clearSection = (endpoint, label) => {
    if (!window.confirm(`Clear all ${label}?`)) return;
    axios.delete(`http://localhost:8080/api/${endpoint}/all`)
      .then(() => {
        alert(`${label} cleared.`);
        window.location.reload();
      })
      .catch(() => alert(`Failed to clear ${label}`));
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(() => alert("Failed to delete user"));
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {/* Search Field */}
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search users/trainers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {/* ✅ Users Section */}
        <div className="col">
          <Card title="Users">
            <button className="btn-danger" onClick={() => clearSection("users", "Users")}>
              Clear Users
            </button>
            <div className="list">
              {filteredUsers.map(u => (
                <div className="list-item" key={u.id}>
                  <div>
                    <strong>{u.name}</strong> <span className="helper">({u.email})</span>
                  </div>
                  <div className="helper">Role: {u.role}</div>
                  <button className="btn-danger" onClick={() => deleteUser(u.id)}>Delete</button>
                </div>
              ))}
              {!filteredUsers.length && <div style={{ padding: 12 }}>No users.</div>}
            </div>
          </Card>
        </div>

        {/* ✅ Trainers Section */}
        <div className="col">
          <Card title="Trainers">
            <button className="btn-danger" onClick={() => clearSection("trainers", "Trainers")}>
              Clear Trainers
            </button>
            <div className="list">
              {trainers.map(t => (
                <div className="list-item" key={t.id}>
                  <div><strong>{t.name}</strong> <span className="helper">({t.email})</span></div>
                  <div className="helper">Specialization: {t.specialization ?? "—"}</div>
                </div>
              ))}
              {!trainers.length && <div style={{ padding: 12 }}>No trainers.</div>}
            </div>
          </Card>
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        {/* Workouts Section */}
        <div className="col">
          <Card title="Workouts">
            <button className="btn-danger" onClick={() => clearSection("workouts", "Workouts")}>
              Clear Workouts
            </button>
            <div className="helper">Total: {workouts.length}</div>
            <div className="list" style={{ marginTop: 8 }}>
              {workouts.slice(0, 6).map(w => (
                <div className="list-item" key={w.id}>
                  <div>{w.exercise} • {w.sets}×{w.reps} • {w.duration} min</div>
                  <div className="badge">{w.done ? "Done" : "Pending"}</div>
                </div>
              ))}
              {!workouts.length && <div style={{ padding: 12 }}>No workouts.</div>}
            </div>
          </Card>
        </div>

        {/* Diet Plans Section */}
        <div className="col">
          <Card title="Diet Plans">
            <button className="btn-danger" onClick={() => clearSection("diets", "Diet Plans")}>
              Clear Diet Plans
            </button>
            <div className="helper">Total: {diets.length}</div>
            <div className="list" style={{ marginTop: 8 }}>
              {diets.slice(0, 6).map(d => (
                <div className="list-item" key={d.id}>
                  <div>{d.mealType} — {d.foodItem}</div>
                  <div>{d.calories} kcal</div>
                </div>
              ))}
              {!diets.length && <div style={{ padding: 12 }}>No diets.</div>}
            </div>
          </Card>
        </div>
      </div>

      {/* ✅ Trainer–User Mappings Section */}
      <div className="row" style={{ marginTop: 12 }}>
        <div className="col">
          <Card title="Trainer–User Mappings">
            <div className="list">
              {mappings.map(m => (
                <div className="list-item" key={m.id}>
                  <div>
                    <strong>Trainer:</strong> {m.trainer?.name} ({m.trainer?.email})
                  </div>
                  <div>
                    <strong>Client:</strong> {m.user?.name} ({m.user?.email})
                  </div>
                </div>
              ))}
              {!mappings.length && <div style={{ padding: 12 }}>No mappings found.</div>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;