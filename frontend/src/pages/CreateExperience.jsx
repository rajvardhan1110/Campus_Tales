import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateExperience = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    companyName: "",
    type: "",
    experienceText: "",
    year: "",
    branch: "",
    passoutYear: "",
    placementType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login first");

    const passoutYear = parseInt(formData.passoutYear);
    if (passoutYear > currentYear + 4) {
      return alert(`Passout year cannot be more than ${currentYear + 4}`);
    }

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
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error submitting experience");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
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
          required
        >
          <option value="">Select Year</option>
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
          <option value="">Select Type</option>
          <option value="Internship">Internship</option>
          <option value="PPO">PPO</option>
          <option value="Internship+Placement">InternshipPlacement</option>
        </select>

        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        >
          <option value="">Select Branch</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Electronics Engineering">Electronics Engineering</option>
          <option value="Computer Science Engineering">Computer Science Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Robotics">Robotics</option>
          <option value="AI/ML">AI/ML</option>
        </select>

        <input
          name="passoutYear"
          type="number"
          placeholder="Passout Year"
          min="1951"
          max={currentYear + 4}
          value={formData.passoutYear}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <select
          name="placementType"
          value={formData.placementType}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        >
          <option value="">Select Placement Type</option>
          <option value="On-Campus">On-Campus</option>
          <option value="Off-Campus">Off-Campus</option>
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
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300 hover:text-black transition font-medium px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateExperience;
