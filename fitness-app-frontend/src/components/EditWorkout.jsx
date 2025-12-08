import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workoutName: "",
    caloriesBurned: "",
    duration: "",
  });

  const [loading, setLoading] = useState();

  useEffect(() => {
    fetchWorkout();
  }, []);

  const fetchWorkout = async () => {
    try {
      const response = await API.get(`/workouts`);
      //find the specify workout from the list
      const workout = response.data.find((w) => w._id === id);

      if (workout) {
        setFormData({
          workoutName: workout.workoutName,
          caloriesBurned: workout.caloriesBurned,
          duration: workout.duration,
        });
      } else {
        alert(`Workout not found`);
        navigate(`/dashboard`);
      }
    } catch (error) {
      alert(`Error Fetching Workout`);
      console.error(error.message);
      navigate(`/dashboard`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    e.preventDefault();

    try {
      await API.patch(`/edit-workout/${id}`, formData);
      alert(`Workout updated!`);
      navigate(`/dashbaord`);
    } catch (error) {
      alert(`Error updating workout`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px" }}>
      <h2>Edit Workout</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="workoutName">Workout Name:</label>
          <input
            type="text"
            name="workoutName"
            id="workoutName"
            value={formData.workoutName}
            onChange={(e) =>
              setFormData({ ...formData, workoutName: e.target.value })
            }
            style={{ width: "100%", margin: "10px 0", padding: "10px" }}
            required
          />
        </div>

        <div>
          <label htmlFor="caloriesBurned">Calorie Burned:</label>
          <input
            type="number"
            name="caloriesBurned"
            id="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={(e) =>
              setFormData({ ...formData, caloriesBurned: e.target.value })
            }
            style={{ width: "100%", margin: "10px 0", padding: "10px" }}
            required
          />
        </div>

        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            required
            style={{ width: "100%", margin: "10px 0", padding: "10px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "12px",
              background: "#4CAF50",
              color: "white",
            }}
          >
            Update Workout
          </button>

          <button
            onClick={() =>
              setTimeout(() => {
                navigate(`/dashbaord`);
              }, 2000)
            }
            style={{ flex: 1, padding: "12px", background: "#ccc" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkout;
