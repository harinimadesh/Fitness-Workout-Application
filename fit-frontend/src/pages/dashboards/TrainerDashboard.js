import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Stat } from "../../components/UI";
import { NavLink } from "react-router-dom";

function TrainerDashboard({ auth }) {
  const [clients, setClients] = useState([]);
  const [workoutsCount, setWorkoutsCount] = useState(0);
  const [dietsCount, setDietsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth?.id) return;

    setLoading(true);

    // ✅ Load full user details for clients mapped to this trainer
    axios.get(`http://localhost:8080/api/users/trainer/${auth.id}`)
      .then(res => {
        console.log("Trainer clients response:", res.data); // debug
        setClients(res.data);
      })
      .catch(err => console.error("Error fetching clients:", err));

    // ✅ Count workouts assigned by trainer
    axios.get(`http://localhost:8080/api/workouts/trainer/${auth.id}`)
      .then(res => setWorkoutsCount(res.data.length))
      .catch(err => console.error("Error fetching workouts:", err));

    // ✅ Count diets assigned by trainer
    axios.get(`http://localhost:8080/api/diets/trainer/${auth.id}`)
      .then(res => setDietsCount(res.data.length))
      .catch(err => console.error("Error fetching diets:", err))
      .finally(() => setLoading(false));
  }, [auth.id]);

  return (
    <div className="container">
      <h2>Welcome, {auth.name}</h2>

      <div className="row" style={{ marginTop: 12 }}>
        <div className="col"><Stat label="Clients" value={clients.length} /></div>
        <div className="col"><Stat label="Assigned Workouts" value={workoutsCount} /></div>
        <div className="col"><Stat label="Diet Plans" value={dietsCount} /></div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div className="col">
          <Card title="Quick actions">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <NavLink to="/trainer/workouts"><button>Create Workouts</button></NavLink>
              <NavLink to="/trainer/diets"><button>Create Diet Plans</button></NavLink>
              <NavLink to="/trainer/progress"><button>View Progress</button></NavLink>
              <NavLink to="/trainer/bmi"><button>View BMI Reports</button></NavLink>
              <NavLink to="/trainer/profile"><button>Manage Clients</button></NavLink>
            </div>
          </Card>

          <Card title="My clients">
            {loading ? (
              <div style={{ padding: 12 }}>Loading clients...</div>
            ) : (
              <div className="list">
                {clients.map(c => (
                  <div className="list-item" key={c.id ?? Math.random()}>
                    <div>
                      <strong>{c.name ?? "Unnamed"}</strong>
                      <span className="helper"> ({c.email ?? "No email"})</span>
                    </div>
                    <div className="helper">
                      Height {c.height ?? "—"} cm • Weight {c.weight ?? "—"} kg
                    </div>
                  </div>
                ))}
                {!clients.length && (
                  <div style={{ padding: 12 }}>
                    No clients mapped. Use Profile → Manage Clients to add.
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TrainerDashboard;