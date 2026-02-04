import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// Trigger Vercel rebuild
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        email,
        password,
        role,
      });

      const user = res.data;
      console.log("Logged in user:", user);
      onLogin(user);

      // ✅ Always use backend role
      const userRole = user.role?.toLowerCase();     
      navigate(userRole === "user" ? "/user" : userRole === "trainer" ? "/trainer" : "/admin");
    } catch (err) {
      if (err.response) {
        console.log("Login error:", err.response.data);
        let message = "Login failed";
        if (typeof err.response.data === "string") {
          message = err.response.data;
        } else if (err.response.data.message) {
          message = err.response.data.message;
        }
        alert(`Login failed: ${message}`);
      } else {
        alert("Server error, please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420, margin: "40px auto" }}>
        <h2 style={{ fontSize: 30, textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 35, marginBottom: 20 }}>
            <button type="submit">Login</button>
            <Link to="/register">
              <button type="button" className="btn-secondary">Register</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;