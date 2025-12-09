import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
  });
  const { register, loading } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      alert(`Registeration successfull!`);
      setTimeout(() => {
        navigate(`/dashboard`);
      }, 1000);
    } catch (error) {
      alert(error.message || `Registeration failed`);
    }
  };
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full name"
            value={formData.name}
            required
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            required
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            value={formData.age}
            required
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder="Weight"
            value={formData.weight}
            required
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px", margin: "10px " }}
        >
          {loading ? `Registering...` : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
