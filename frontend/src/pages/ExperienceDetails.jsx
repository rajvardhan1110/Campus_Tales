import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [experience, setExperience] = useState(null);
  const token = localStorage.getItem("token");

  const fetchExperience = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch experience");
      const data = await res.json();
      setExperience(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, [id]);

  if (!experience) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Loading experience details...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-200">
            {/* Company Header */}
            <div className="text-center mb-8 break-words">
              <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 leading-tight">
                {experience.companyName}
              </h1>
              <p className="text-gray-500 text-sm">
                Uploaded on {new Date(experience.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y py-4">
              <Meta label="Student Name" value={experience.student?.name} />
              <Meta label="Branch" value={experience.branch} />
              <Meta label="Year" value={experience.year} />
              <Meta label="Passout Year" value={experience.passoutYear} />
              <Meta label="Company Type" value={experience.type} />
              <Meta label="Placement Type" value={experience.placementType} />
            </div>

            {/* Experience Content */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                Experience Details
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 whitespace-pre-line leading-relaxed break-words overflow-hidden">
                {experience.experienceText}
              </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate(-1)}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300 hover:text-black transition font-medium"
              >
                Back
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

// Meta field component
const Meta = ({ label, value }) => (
  <p className="text-gray-700 text-sm sm:text-base break-words">
    <span className="font-medium text-indigo-600">{label}:</span>{" "}
    {value || "N/A"}
  </p>
);

export default ExperienceDetails;
