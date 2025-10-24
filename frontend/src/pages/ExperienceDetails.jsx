import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // <-- Import axios
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

// --- New InfoTag Component ---
const InfoTag = ({ label, value }) => (
  <span className="inline-block bg-blue-50 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
    <strong>{label}:</strong> {value || 'N/A'}
  </span>
);

const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [experience, setExperience] = useState(null);
  const token = localStorage.getItem("token");

  // --- REFACTORED WITH AXIOS & USECALLBACK ---
  const fetchExperience = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExperience(response.data); // Data is directly on response.data
    } catch (err) {
      console.error("Failed to fetch experience:", err);
      if (err.response && err.response.status === 404) {
        alert("Experience not found.");
        navigate('/dashboard'); // Redirect if not found
      }
    }
  }, [id, token, navigate]); // Added dependencies

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]); // Use fetchExperience as dependency

  // --- New Attractive Loading State ---
  if (!experience) {
    return (
      <div className="flex h-screen bg-gray-50 text-gray-800">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        {/* Main content area with sliding logic */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarOpen ? 'md:pl-60' : 'md:pl-20'
        }`}>
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
            <div className="text-gray-600 text-xl font-medium">
              Loading experience details...
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  // --- Main Component Render ---
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* --- Main Content Area (with sliding logic) --- */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen ? 'md:pl-60' : 'md:pl-20'
      }`}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* --- Attractive Page Content --- */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 sm:p-12">
            
            {/* --- Company Header --- */}
            <div className="text-center mb-8 break-words">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {experience.companyName}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Shared by <span className="font-semibold text-blue-600">{experience.student?.name || 'N/A'}</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Uploaded on {new Date(experience.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* --- Info Tags --- */}
            <div className="flex flex-wrap justify-center gap-3 border-y border-gray-200 py-6 my-8">
              <InfoTag label="Branch" value={experience.branch} />
              <InfoTag label="Year" value={experience.year} />
              <InfoTag label="Passout" value={experience.passoutYear} />
              <InfoTag label="Type" value={experience.type} />
              <InfoTag label="Placement" value={experience.placementType} />
            </div>

            {/* --- Experience Content --- */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Experience Details
              </h2>
              {/* Preserves formatting from the textarea */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-800 whitespace-pre-line leading-relaxed break-words overflow-hidden">
                {experience.experienceText}
              </div>
            </div>

            {/* --- Attractive Back Button --- */}
            <div className="flex justify-center mt-10">
              <button
                onClick={() => navigate(-1)} // navigate(-1) goes to the previous page
                className="flex items-center justify-center gap-2
                           px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md
                           transform transition-all duration-300 
                           hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-lg
                           active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Go Back
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ExperienceDetails;