import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./components/Login";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EditWorkout from "./components/EditWorkout.jsx";
import EditMeal from "./components/EditMeal.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header style={{ padding: "20px", background: "#f5f5f5" }}>
            <h1>Fitness App</h1>
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <div style={{ padding: "20px" }}>
                  Home - Fitness app will be here
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-workout/:id" element={<EditWorkout />} />
            <Route path="/edit-meal/:id" element={<EditMeal />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
