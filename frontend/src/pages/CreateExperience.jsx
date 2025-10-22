import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateExperience = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // get JWT token

  const [formData, setFormData] = useState({
    companyName: "",
    type: "Internship",
    experienceText: "",
    year: "1st",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login first");

    try {
      await axios.post(
        "http://localhost:3000/api/experience",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Experience submitted successfully!");
      navigate("/dashboard"); // go back to dashboard
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error submitting experience");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Experience</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        >
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">4th Year</option>
        </select>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        >
          <option value="Internship">Internship</option>
          <option value="PPO">PPO</option>
        </select>
        <textarea
          name="experienceText"
          placeholder="Describe your experience..."
          value={formData.experienceText}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateExperience;
