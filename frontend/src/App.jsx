import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyPosts from "./pages/MyPosts";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import CreateExperience from "./pages/CreateExperience";
import ExperienceDetails from "./pages/ExperienceDetails";
import AdminExperienceDetails from "./pages/AdminExperienceDetails";

function App() {
  const token = localStorage.getItem("token");
  let user = null;

  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1])); // now contains role
    } catch {}
  }

  const RequireAuth = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />; // redirect admin to admin page
    return children;
  };

  const RequireAdmin = ({ children }) => {
    if (!token || user?.role !== "admin") return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Student Routes */}
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/create" element={<RequireAuth><CreateExperience /></RequireAuth>} />
        <Route path="/experience/:id" element={<RequireAuth><ExperienceDetails /></RequireAuth>} />
        <Route path="/dashboard/myposts" element={<RequireAuth><MyPosts /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path="/admin/experience/:id" element={<RequireAdmin><AdminExperienceDetails /></RequireAdmin>}/>
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
