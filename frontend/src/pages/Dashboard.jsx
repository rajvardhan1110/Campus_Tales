import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [filters, setFilters] = useState({
    studentName: "",
    companyName: "",
    type: "",
    year: "",
    status: "",
    date: "",
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const token = localStorage.getItem("token");

  // ✅ Fetch all experiences (backend must populate student)
  const fetchExperiences = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/experience", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch experiences");

      const data = await res.json();

      // Dynamic filtering
      const filtered = data.filter((exp) => {
        const matchesStudent =
          filters.studentName === "" ||
          exp.student?.name
            .toLowerCase()
            .includes(filters.studentName.toLowerCase());
        const matchesCompany =
          filters.companyName === "" ||
          exp.companyName
            .toLowerCase()
            .includes(filters.companyName.toLowerCase());
        const matchesType =
          filters.type === "" || exp.type === filters.type;
        const matchesYear =
          filters.year === "" || exp.student?.year === filters.year;
        const matchesStatus =
          filters.status === "" || exp.status === filters.status;
        const matchesDate =
          filters.date === "" ||
          new Date(exp.createdAt).toISOString().startsWith(filters.date);

        return (
          matchesStudent &&
          matchesCompany &&
          matchesType &&
          matchesYear &&
          matchesStatus &&
          matchesDate
        );
      });

      setExperiences(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  useEffect(() => {
    fetchExperiences();
  }, [filters]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} />

        {/* Filters Section */}
        <div className="p-5 flex flex-wrap gap-4 items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-lg shadow-md">
          <input
            type="text"
            name="studentName"
            placeholder="Search By Student Name"
            value={filters.studentName}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="text"
            name="companyName"
            placeholder="Search By Company Name"
            value={filters.companyName}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="">All Types</option>
            <option value="Internship">Internship</option>
            <option value="PPO">PPO</option>
          </select>
          <input
            type="text"
            name="year"
            placeholder="Search By Student Year"
            value={filters.year}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Create Post Button */}
        <div className="p-5 flex justify-end">
          <button
            onClick={() => navigate("/create")}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Create Post
          </button>
        </div>

        {/* Experiences Grid */}
        <div className="p-5 flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2 text-indigo-600">
                {exp.companyName || "N/A"}
              </h3>
              <p>Type: {exp.type || "N/A"}</p>
              <p>Year: {exp.year || "N/A"}</p>
              <p>{exp.experienceText || "No description provided"}</p>
              <p className="text-sm text-gray-500 mt-2">
                By: {exp.student?.name || "N/A"}
              </p>
              
              <p className="text-sm text-gray-500 mt-1">
                Uploaded:{" "}
                {exp.createdAt
                  ? new Date(exp.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
