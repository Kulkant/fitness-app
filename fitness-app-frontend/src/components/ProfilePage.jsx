import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";

const ProfilePage = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    weight: "",
  });

  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        age: user.age || "",
        weight: user.weight || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.patch(`/users/profile`, form);
      alert(`Profile updated!`);
    } catch (error) {
      alert(`Update failed!`);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2>Your Profile</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={user?.name}
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder={user?.age}
              value={form.age}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={form.weight}
              placeholder={user?.weight}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user?.email || ""}
            placeholder={user?.email}
            disabled
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              background: "#f5f5f5",
            }}
          />
          <small>Email cannot be changed</small>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? `Upading` : `Update Profile`}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
