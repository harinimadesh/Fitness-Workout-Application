import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile({ auth }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goals: "",
  });

  useEffect(() => {
    if (!auth?.id) return;
    axios.get(`http://localhost:8080/api/users/${auth.id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error("Error fetching profile:", err));
  }, [auth]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users", { ...form, id: auth.id });
      alert("Profile updated!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Update failed");
    }
  };

  return (
    <div className="container">
      <h2>My Profile</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <form onSubmit={handleSave}>
          <label>Name</label>
          <input name="name" value={form.name || ""} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={form.email || ""} onChange={handleChange} required />
          <div className="row">
            <div className="col">
              <label>Age</label>
              <input type="number" name="age" value={form.age || ""} onChange={handleChange} />
            </div>
            <div className="col">
              <label>Gender</label>
              <select name="gender" value={form.gender || ""} onChange={handleChange}>
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Height (cm)</label>
              <input type="number" name="height" value={form.height || ""} onChange={handleChange} />
            </div>
            <div className="col">
              <label>Weight (kg)</label>
              <input type="number" name="weight" value={form.weight || ""} onChange={handleChange} />
            </div>
          </div>
          <label>Fitness Goals</label>
          <textarea name="goals" value={form.goals || ""} onChange={handleChange} rows={3} />
          <div style={{ marginTop: 12 }}>
            <button type="submit">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;