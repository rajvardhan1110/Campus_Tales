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
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login first");
    
    setLoading(true);

    const passoutYear = parseInt(formData.passoutYear);
    if (passoutYear > currentYear + 4) {
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };
  
  const inputClass = `
    w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
    text-gray-900 placeholder-gray-500 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    transition-all duration-300
    hover:border-gray-400
  `;
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 overflow-hidden">
      
      {/* Background Blobs */}
      <div 
        className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-200 rounded-full 
                   opacity-40 blur-3xl filter animate-pulse"
      />
      <div 
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-200 rounded-full 
                   opacity-40 blur-3xl filter animate-pulse"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Form Card */}
      <div className="relative z-10 bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-4xl
                     transition-all duration-300 ease-out">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center
                      transform transition-all duration-300">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Share Your Experience
          </span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Grid Layout for inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div>
              <label htmlFor="companyName" className={labelClass}>Company Name</label>
              <input
                id="companyName"
                name="companyName"
                placeholder="e.g., Google, Microsoft..."
                value={formData.companyName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            
            <div>
              <label htmlFor="type" className={labelClass}>Experience Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Type</option>
                <option value="Internship">Internship</option>
                <option value="PPO">PPO</option>
                <option value="Internship+Placement">Internship+Placement</option>
              </select>
            </div>

            <div>
              <label htmlFor="year" className={labelClass}>Your Current Year</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
            </div>

            <div>
              <label htmlFor="branch" className={labelClass}>Your Branch</label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={inputClass}
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
            </div>
            
            <div>
              <label htmlFor="passoutYear" className={labelClass}>Passout Year</label>
              <input
                id="passoutYear"
                name="passoutYear"
                type="number"
                placeholder="e.g., 2026"
                min="1951"
                max={currentYear + 4}
                value={formData.passoutYear}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="placementType" className={labelClass}>Placement Type</label>
              <select
                id="placementType"
                name="placementType"
                value={formData.placementType}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Placement Type</option>
                <option value="On-Campus">On-Campus</option>
                <option value="Off-Campus">Off-Campus</option>
              </select>
            </div>
          </div>
          
          {/* Textarea (Full Width) */}
          <div>
            <label htmlFor="experienceText" className={labelClass}>Your Experience</label>
            <textarea
              id="experienceText"
              name="experienceText"
              placeholder="Describe your experience in detail... (e.g., rounds, questions asked, difficulty)"
              value={formData.experienceText}
              onChange={handleChange}
              className={`${inputClass} h-40 resize-none`}
              rows="8"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group flex items-center justify-center w-full gap-2
                       px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                       font-semibold rounded-lg shadow-lg
                       transition-all duration-300 ease-out
                       hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 
                       hover:shadow-xl
                       active:scale-95
                       disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                 className={`w-5 h-5 transition-transform duration-300 ${loading ? 'animate-spin' : 'group-hover:scale-105'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="transition-transform duration-300 group-hover:scale-105">
              {loading ? "Submitting..." : "Submit Experience"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExperience;