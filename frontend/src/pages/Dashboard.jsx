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
    branch: "",
    passoutYear: "",
    placementType: "",
    status: "",
    date: "",
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const token = localStorage.getItem("token");

  // Fetch experiences
  const fetchExperiences = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/experience", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch experiences");
      const data = await res.json();

      // Filtering
      const filtered = data.filter((exp) => {
        return (
          (filters.studentName === "" ||
            exp.student?.name
              .toLowerCase()
              .includes(filters.studentName.toLowerCase())) &&
          (filters.companyName === "" ||
            exp.companyName
              .toLowerCase()
              .includes(filters.companyName.toLowerCase())) &&
          (filters.type === "" || exp.type === filters.type) &&
          (filters.year === "" || exp.year === filters.year) &&
          (filters.branch === "" || exp.branch === filters.branch) &&
          (filters.passoutYear === "" || exp.passoutYear === filters.passoutYear) &&
          (filters.placementType === "" || exp.placementType === filters.placementType)
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

  // Generate Passout Year options (last 10 years up to 4 years ahead)
  const currentYear = new Date().getFullYear();
  const passoutYears = [];
  for (let i = currentYear - 10; i <= currentYear + 4; i++) {
    passoutYears.push(i.toString());
  }

  const branches = [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical",
    "Electronics",
    "Computer Science Engineering",
    "Information Technology",
    "Robotics",
    "AI/ML",
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 bg-gray-100 dark:bg-gray-700" >
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} />
{/* Filters Section */}
<div className="p-5 flex flex-wrap justify-center items-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-lg shadow-md">
  {/* Group 1: Text Inputs */}
  <div className="flex flex-wrap gap-4 justify-center">
    <input
      type="text"
      name="studentName"
      placeholder="Search By Student Name"
      value={filters.studentName}
      onChange={handleFilterChange}
      className="px-4 py-2 rounded-md border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
    />
    <input
      type="text"
      name="companyName"
      placeholder="Search By Company Name"
      value={filters.companyName}
      onChange={handleFilterChange}
      className="px-4 py-2 rounded-md border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
    />
  </div>

  {/* Group 2: Select Inputs */}
  <div className="flex flex-wrap gap-4 justify-center">
    <select
      name="type"
      value={filters.type}
      onChange={handleFilterChange}
      className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
    >
      <option value="">All Types</option>
      <option value="Internship">Internship</option>
      <option value="PPO">PPO</option>
      <option value="Internship+Placement">Internship+Placement</option>
    </select>

    <select
      name="year"
      value={filters.year}
      onChange={handleFilterChange}
      className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
    >
      <option value="">All Years</option>
      <option value="1st">1st</option>
      <option value="2nd">2nd</option>
      <option value="3rd">3rd</option>
      <option value="4th">4th</option>
    </select>

    <select
      name="branch"
      value={filters.branch}
      onChange={handleFilterChange}
      className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
    >
      <option value="">All Branches</option>
      {branches.map((b) => (
        <option key={b} value={b}>
          {b}
        </option>
      ))}
    </select>

    <select
      name="passoutYear"
      value={filters.passoutYear}
      onChange={handleFilterChange}
      className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
    >
      <option value="">All Passout Years</option>
      {passoutYears.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>

    <select
      name="placementType"
      value={filters.placementType}
      onChange={handleFilterChange}
      className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
    >
      <option value="">All Placement Types</option>
      <option value="On-Campus">On-Campus</option>
      <option value="Off-Campus">Off-Campus</option>
    </select>
  </div>
</div>

{/* Create Post Button */}
<div className="p-5 flex justify-center">
  <button
    onClick={() => navigate("/create")}
    className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300 hover:text-black transition font-medium"
  >
    Create Post
  </button>
</div>

{/* Experiences Grid */}
<div className="p-5 flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
  {experiences.length === 0 ? (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105">
      <h2 className="text-2xl font-semibold mb-2">No Experiences Found</h2>
      <p className="text-sm opacity-90">
        Try adjusting your filters or check back later.
      </p>
    </div>
  </div>
) : (
  experiences.map((exp) => (
    <div
      key={exp._id}
      onClick={() => navigate(`/experience/${exp._id}`)}
      className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition-transform transform hover:-translate-y-2 flex flex-col gap-1 border-l-4 border-indigo-600"
    >
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-indigo-600">Shared by:</span>{" "}
        {exp.student?.name || "N/A"}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-indigo-600">Branch:</span>{" "}
        {exp.branch || "N/A"}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-indigo-600">Year:</span>{" "}
        {exp.year || "N/A"}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-indigo-600">Passout Year:</span>{" "}
        {exp.passoutYear || "N/A"}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-indigo-600">Type:</span>{" "}
        {exp.type || "N/A"}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-indigo-600">Placement Type:</span>{" "}
        {exp.placementType || "N/A"}
      </p>

      <h3 className="text-xl font-bold text-white bg-indigo-600 px-3 py-1 rounded mt-2 text-center">
        {exp.companyName || "N/A"}
      </h3>

      <p className="text-xs text-gray-500 mt-auto">
        Uploaded:{" "}
        {exp.createdAt
          ? new Date(exp.createdAt).toLocaleDateString()
          : "N/A"}
      </p>
    </div>
  ))
)}

</div>


        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
