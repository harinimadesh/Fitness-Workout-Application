import React, { useEffect, useState } from "react";
import axios from "axios";

function TrainerProfile({ auth }) {
  const [form, setForm] = useState({
    name: auth.name || "",
    email: auth.email || "",
    specialization: auth.specialization || "",
    availability: "Mon-Fri",
  });
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [addClientId, setAddClientId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth?.id) return;

    // ✅ Load only USER-role accounts for dropdown
    axios.get("http://localhost:8080/api/users/role/USER")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));

    // ✅ Load mapped clients for this trainer
    axios.get(`http://localhost:8080/api/users/trainer/${auth.id}`)
      .then(res => {
        console.log("Trainer mapped clients:", res.data); // debug
        setClients(res.data);
      })
      .catch(err => console.error("Error fetching trainer clients:", err));
  }, [auth]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/users/${auth.id}`, {
      ...form,
      role: "trainer",
      id: auth.id
    })
      .then(() => alert("Trainer profile updated!"))
      .catch(err => {
        console.error("Error updating trainer profile:", err);
        alert("Update failed");
      });
  };

  const addClient = () => {
    if (!addClientId) return;
    if (clients.some(c => c.id === Number(addClientId))) {
      return alert("Client already mapped.");
    }

    setLoading(true);
    axios.post("http://localhost:8080/api/trainer-clients", {
      trainer: { id: auth.id },
      user: { id: Number(addClientId) }
    })
      .then(res => {
        console.log("Add client response:", res.data); // debug
        return axios.get(`http://localhost:8080/api/users/trainer/${auth.id}`);
      })
      .then(res => {
        setClients(res.data);
        alert("Client added to your list.");
      })
      .catch(err => {
        console.error("Error adding client:", err.response?.data || err.message);
        alert("Failed to add client");
      })
      .finally(() => setLoading(false));

    setAddClientId("");
  };

  const removeClient = (id) => {
  setLoading(true);
  axios.delete("http://localhost:8080/api/trainer-clients", {
    params: { trainerId: auth.id, userId: id }
  })
    .then(res => {
      const message = typeof res.data === "string" ? res.data : "Client removed successfully";
      alert(message); // ✅ shows clean message
      return axios.get(`http://localhost:8080/api/users/trainer/${auth.id}`);
    })
    .then(res => {
      setClients(res.data);
    })
    .catch(err => {
      const msg = err.response?.data || "Failed to remove client";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg)); // ✅ fallback for object errors
      console.error("Error removing client:", msg);
    })
    .finally(() => setLoading(false));
};

  return (
    <div className="container">
      <h2>Trainer Profile</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <form onSubmit={saveProfile}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>Specialization</label>
          <input name="specialization" value={form.specialization} onChange={handleChange} placeholder="e.g., Weight Loss" />
          <label>Availability</label>
          <input name="availability" value={form.availability} onChange={handleChange} />
          <div style={{ marginTop: 12 }}>
            <button type="submit">Save Profile</button>
          </div>
        </form>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h3>Manage Clients</h3>
        <div className="row">
          <div className="col">
            <label>Add client</label>
            <select value={addClientId} onChange={(e) => setAddClientId(e.target.value)}>
              <option value="">Select user</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
            <div style={{ marginTop: 8 }}>
              <button className="btn-secondary" onClick={addClient} disabled={loading}>
                {loading ? "Processing..." : "Add Client"}
              </button>
            </div>
          </div>
          <div className="col">
            <div className="list">
              {clients.map(c => (
                <div className="list-item" key={c.id ?? Math.random()}>
                  <div>
                    <strong>{c.name ?? "Unnamed"}</strong>
                    <span className="helper"> ({c.email ?? "No email"})</span>
                  </div>
                  <button className="btn-danger" onClick={() => removeClient(c.id)} disabled={loading}>
                    {loading ? "Processing..." : "Remove"}
                  </button>
                </div>
              ))}
              {!clients.length && <div style={{ padding: 12 }}>No clients mapped yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerProfile;