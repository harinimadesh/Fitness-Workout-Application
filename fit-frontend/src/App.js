import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Register from "./pages/Register";

// Dashboards
import UserDashboard from "./pages/dashboards/UserDashboard";
import TrainerDashboard from "./pages/dashboards/TrainerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

// Workouts
import UserWorkouts from "./pages/workouts/UserWorkouts";
import TrainerWorkouts from "./pages/workouts/TrainerWorkouts";

// Diets
import UserDietPlans from "./pages/diets/UserDietPlans";
import TrainerDietPlans from "./pages/diets/TrainerDietPlans";

// Progress
import UserProgress from "./pages/progress/UserProgress";
import TrainerProgress from "./pages/progress/TrainerProgress";

// BMI
import UserBMIReports from "./pages/bmi/UserBMIReports";
import TrainerBMIReports from "./pages/bmi/TrainerBMIReports";

// Profiles
import UserProfile from "./pages/profiles/UserProfile";
import TrainerProfile from "./pages/profiles/TrainerProfile";

function App() {
  const [auth, setAuth] = useState(null);

  // Seed demo data once
  useEffect(() => {
    if (!localStorage.getItem("seeded")) {
      const users = [
        { id: "u1", name: "Harini", email: "harini@example.com", role: "user", age: 25, gender: "female", height: 165, weight: 60, goals: "Weight loss" },
        { id: "u2", name: "Kiran", email: "kiran@example.com", role: "user", age: 28, gender: "male", height: 178, weight: 75, goals: "Strength" }
      ];
      const trainers = [
        { id: "t1", name: "Arun", email: "aruntrainer@example.com", role: "trainer", specialization: "Weight Loss", clients: ["u1"] },
      ];
      const admins = [
        { id: "a1", name: "Admin", email: "admin@example.com", role: "admin" },
      ];
      const workouts = [
        { id: "w1", userId: "u1", exercise: "Push Ups", sets: 3, reps: 12, duration: 10, done: false },
        { id: "w2", userId: "u1", exercise: "Squats", sets: 4, reps: 10, duration: 12, done: false },
      ];
      const diets = [
        { id: "d1", userId: "u1", mealType: "breakfast", foodItem: "Oats + Banana", calories: 350 },
        { id: "d2", userId: "u1", mealType: "lunch", foodItem: "Grilled chicken + Salad", calories: 600 },
      ];
      const progressPhotos = [
        { id: "p1", userId: "u1", url: "", caption: "Week 1" },
      ];
      const bmiLogs = [
        { id: "b1", userId: "u1", height: 165, weight: 60, bmi: 22.04, date: new Date().toISOString() },
      ];
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("trainers", JSON.stringify(trainers));
      localStorage.setItem("admins", JSON.stringify(admins));
      localStorage.setItem("workouts", JSON.stringify(workouts));
      localStorage.setItem("diets", JSON.stringify(diets));
      localStorage.setItem("progressPhotos", JSON.stringify(progressPhotos));
      localStorage.setItem("bmiLogs", JSON.stringify(bmiLogs));
      localStorage.setItem("seeded", "true");
    }
  }, []);

  return (
    <Router>
      <div className="app-wrapper">
        {auth && <Navbar role={auth.role} onLogout={() => setAuth(null)} />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LoginForm onLogin={setAuth} />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboards */}
            <Route path="/user" element={auth?.role === "user" ? <UserDashboard auth={auth} /> : <Navigate to="/" />} />
            <Route path="/trainer" element={auth?.role === "trainer" ? <TrainerDashboard auth={auth} /> : <Navigate to="/" />} />
            <Route path="/admin" element={auth?.role === "admin" ? <AdminDashboard auth={auth}/> : <Navigate to="/" />} />

            {/* Workouts */}
            <Route path="/user/workouts" element={auth?.role === "user" ? <UserWorkouts auth={auth} /> : <Navigate to="/" />} />
            <Route path="/trainer/workouts" element={auth?.role === "trainer" ? <TrainerWorkouts auth={auth} /> : <Navigate to="/" />} />

            {/* Diet Plans */}
            <Route path="/user/diets" element={auth?.role === "user" ? <UserDietPlans auth={auth} /> : <Navigate to="/" />} />
            <Route path="/trainer/diets" element={auth?.role === "trainer" ? <TrainerDietPlans auth={auth} /> : <Navigate to="/" />} />

            {/* Progress */}
            <Route path="/user/progress" element={auth?.role === "user" ? <UserProgress auth={auth} /> : <Navigate to="/" />} />
            <Route path="/trainer/progress" element={auth?.role === "trainer" ? <TrainerProgress auth={auth} /> : <Navigate to="/" />} />

            {/* BMI Reports */}
            <Route path="/user/bmi" element={auth?.role === "user" ? <UserBMIReports auth={auth} /> : <Navigate to="/" />} />
            <Route path="/trainer/bmi" element={auth?.role === "trainer" ? <TrainerBMIReports auth={auth} /> : <Navigate to="/" />} />

            {/* Profiles */}
            <Route path="/user/profile" element={auth?.role === "user" ? <UserProfile auth={auth} /> : <Navigate to="/" />} />
            <Route path="/trainer/profile" element={auth?.role === "trainer" ? <TrainerProfile auth={auth} /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;