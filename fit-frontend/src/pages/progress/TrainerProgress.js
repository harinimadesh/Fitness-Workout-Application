import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainerProgress({ auth }) {
  const [photos, setPhotos] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;

    // ✅ Load mapped clients (full user objects)
    axios.get(`http://localhost:8080/api/users/trainer/${auth.id}`)
      .then(res => setClients(res.data))
      .catch(err => console.error("Error fetching clients:", err));

    // ✅ Load progress photos for mapped clients
    axios.get(`http://localhost:8080/api/progress/trainer/${auth.id}`)
      .then(res => setPhotos(res.data))
      .catch(err => console.error("Error fetching progress photos:", err));
  }, [auth.id]);

  // ✅ Filter only USER-role clients
  const userClients = clients.filter(c => c.role === "user" || c.role === "USER");

  return (
    <div className="container">
      <h2>Client Progress</h2>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="helper">
          Clients: {userClients.length ? userClients.map(c => c.name).join(", ") : "None"}
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        {photos.map(p => {
          const client = userClients.find(c => c.id === p.userId);
          if (!client) return null; // ✅ Skip if not a USER-role client

          return (
            <div className="col" key={p.id}>
              <div className="card">
                {p.url ? (
                  <img src={p.url} alt={p.caption} style={{ width: "100%", borderRadius: 8 }} />
                ) : (
                  <div className="helper">No preview</div>
                )}
                <div style={{ marginTop: 6 }}>
                  <strong>{client.name}</strong> — {p.caption}
                </div>
              </div>
            </div>
          );
        })}
        {!photos.length && <div className="card">No client photos yet.</div>}
      </div>
    </div>
  );
}

export default TrainerProgress;