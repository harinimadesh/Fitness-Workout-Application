import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ role, onLogout }) {
  const base = role === "user" ? "/user" : role === "trainer" ? "/trainer" : "/admin";

  return (
    <nav>
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink to={base} end>Home</NavLink>
        {role === "user" && (
          <>
            <NavLink to="/user/workouts">Workouts</NavLink>
            <NavLink to="/user/diets">Diet Plans</NavLink>
            <NavLink to="/user/progress">Progress</NavLink>
            <NavLink to="/user/bmi">BMI Reports</NavLink>
            <NavLink to="/user/profile">Profile</NavLink>
          </>
        )}
        {role === "trainer" && (
          <>
            <NavLink to="/trainer/workouts">Workouts</NavLink>
            <NavLink to="/trainer/diets">Diet Plans</NavLink>
            <NavLink to="/trainer/progress">Progress</NavLink>
            <NavLink to="/trainer/bmi">BMI Reports</NavLink>
            <NavLink to="/trainer/profile">Profile</NavLink>
          </>
        )}
        {role === "admin" && <NavLink to="/admin">Dashboard</NavLink>}
      </div>
      <button className="btn-secondary" onClick={onLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
