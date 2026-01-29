import React, { useEffect, useState } from "react";
import axios from "axios";

function UserBMIReports({ auth }) {
  const [height, setHeight] = useState(auth.height || "");
  const [weight, setWeight] = useState(auth.weight || "");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;
    axios.get(`http://localhost:8080/api/bmi/user/${auth.id}`)
      .then(res => setLogs(res.data))
      .catch(err => console.error("Error fetching BMI logs:", err));
  }, [auth.id]);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return alert("Enter height and weight");

    const h = Number(height) / 100;
    const bmi = Number((Number(weight) / (h * h)).toFixed(2));

    const newItem = {
      userId: auth.id,
      height: Number(height),
      weight: Number(weight),
      bmi,
      date: new Date().toISOString()
    };

    axios.post("http://localhost:8080/api/bmi", newItem)
      .then(() => axios.get(`http://localhost:8080/api/bmi/user/${auth.id}`))
      .then(res => setLogs(res.data))
      .catch(err => console.error("Error saving BMI report:", err));
  };

  return (
    <div className="container">
      <h2>BMI Reports</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <form onSubmit={calculateBMI}>
          <label>Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
          <label>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
          <div style={{ marginTop: 12 }}><button type="submit">Calculate & Save</button></div>
        </form>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h3>History</h3>
        <div className="list" style={{ marginTop: 8 }}>
          {logs.map(l => (
            <div className="list-item" key={l.id}>
              <div>Height {l.height} cm • Weight {l.weight} kg</div>
              <div><strong>BMI {l.bmi}</strong> <span className="helper">({new Date(l.date).toLocaleString()})</span></div>
            </div>
          ))}
          {!logs.length && <div style={{ padding: 12 }}>No BMI logs yet.</div>}
        </div>
      </div>
    </div>
  );
}

export default UserBMIReports;