import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainerBMIReports({ auth }) {
  const [logs, setLogs] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;

    axios.get(`http://localhost:8080/api/users?trainerId=${auth.id}`)
      .then(res => setClients(res.data))
      .catch(err => console.error("Error fetching clients:", err));

    axios.get(`http://localhost:8080/api/bmi/trainer/${auth.id}`)
      .then(res => setLogs(res.data))
      .catch(err => console.error("Error fetching BMI logs:", err));
  }, [auth.id]);

  return (
    <div className="container">
      <h2>Client BMI Reports</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <div className="list">
          {logs.map(l => {
            const user = clients.find(c => c.id === l.userId);
            return (
              <div className="list-item" key={l.id}>
                <div><strong>{user?.name || "Client"}</strong></div>
                <div>H {l.height} cm • W {l.weight} kg • <strong>BMI {l.bmi}</strong></div>
              </div>
            );
          })}
          {!logs.length && <div style={{ padding: 12 }}>No BMI logs for clients yet.</div>}
        </div>
      </div>
    </div>
  );
}

export default TrainerBMIReports;