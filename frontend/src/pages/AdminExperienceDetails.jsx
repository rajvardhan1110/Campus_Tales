import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [experience, setExperience] = useState(null);
  const token = localStorage.getItem("token");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch one experience by ID
  const fetchExperience = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/experience/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExperience(data);
    } catch (err) {
      console.error("Error fetching experience:", err);
    }
  };

  // Approve
  const approveExperience = async () => {
    try {
      await fetch(`http://localhost:3000/api/admin/experience/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Experience approved!");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  // Reject
  const rejectExperience = async () => {
    try {
      await fetch(`http://localhost:3000/api/admin/experience/reject/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Experience rejected!");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  if (!experience)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-700 text-gray-800 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-6 flex flex-col items-center overflow-y-auto">
          <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl p-8 border-t-4 border-indigo-600">
            {/* Company & Placement Info */}
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
              {experience.companyName}
            </h1>
            <p className="text-center text-gray-500 mb-6">
              {experience.type} • {experience.placementType || "N/A"}
            </p>

            {/* Card Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-gray-700">
              <p>
                <span className="font-semibold text-indigo-600">Student:</span>{" "}
                {experience.student?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-indigo-600">Email:</span>{" "}
                {experience.student?.email || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-indigo-600">Branch:</span>{" "}
                {experience.branch || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-indigo-600">Year:</span>{" "}
                {experience.year || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-indigo-600">Passout Year:</span>{" "}
                {experience.passoutYear || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-indigo-600">Status:</span>{" "}
                <span
                  className={
                    experience.status === "approved"
                      ? "text-green-600 font-semibold"
                      : experience.status === "rejected"
                      ? "text-red-600 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {experience.status}
                </span>
              </p>
            </div>

            {/* Experience Text */}
            <div
              className={`bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 ${
                experience.status !== "pending" ? "overflow-x-hidden" : ""
              }`}
            >
              <h2 className="text-lg font-semibold text-indigo-600 mb-2">
                Experience Description
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {experience.experienceText || "No description provided"}
              </p>
            </div>

            {/* Skills / Tools */}
            {experience.skills && (
              <div
                className={`bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 ${
                  experience.status !== "pending" ? "overflow-x-hidden" : ""
                }`}
              >
                <h2 className="text-lg font-semibold text-indigo-600 mb-2">
                  Skills / Tools Used
                </h2>
                <p className="text-gray-700">{experience.skills}</p>
              </div>
            )}

            {/* Approve / Reject Buttons */}
            {experience.status === "pending" && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={approveExperience}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={rejectExperience}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}

            {/* Go to Dashboard Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminExperienceDetails;
