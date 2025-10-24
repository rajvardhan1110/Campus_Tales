import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

// --- New Icon Components for Inputs ---
const IconSearch = () => <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
const IconSliders = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 18H7.5m3-6h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 12H7.5" /></svg>
const IconCreate = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
const IconNotFound = () => <svg className="w-16 h-16 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m-1.125 0H6.625A2.25 2.25 0 004.5 4.875v11.25a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 16.125v-1.5" /></svg>

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // <-- State for filter toggle
  const [filters, setFilters] = useState({
    studentName: "", companyName: "", type: "", year: "",
    branch: "", passoutYear: "", placementType: "",
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const token = localStorage.getItem("token");

  const fetchExperiences = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/experience", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      const filtered = data.filter((exp) => (
        (filters.studentName === "" || exp.student?.name.toLowerCase().includes(filters.studentName.toLowerCase())) &&
        (filters.companyName === "" || exp.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) &&
        (filters.type === "" || exp.type === filters.type) &&
        (filters.year === "" || exp.year === filters.year) &&
        (filters.branch === "" || exp.branch === filters.branch) &&
        (filters.passoutYear === "" || exp.passoutYear === filters.passoutYear) &&
        (filters.placementType === "" || exp.placementType === filters.placementType)
      ));
      setExperiences(filtered);
    } catch (err) {
      console.error("Failed to fetch experiences:", err);
    }
  }, [token, filters]);

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  // --- Dynamic Year/Branch options (unchanged) ---
  const currentYear = new Date().getFullYear();
  const passoutYears = Array.from({ length: 15 }, (_, i) => (currentYear - 10 + i).toString());
  const branches = [
    "Civil Engineering", "Mechanical Engineering", "Electrical", "Electronics",
    "Computer Science Engineering", "Information Technology", "Robotics", "AI/ML",
  ];
  
  // --- New attractive input field style ---
  const inputClass = `
    pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg 
    text-gray-900 placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-300
  `
  const selectClass = `
    px-4 py-2 w-full border border-gray-300 rounded-lg 
    text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 
    focus:border-transparent transition-all duration-300
  `

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* --- Main Content Area --- */}
      {/* Added md:pl-20 to account for the collapsed sidebar */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
  sidebarOpen ? 'md:pl-60' : 'md:pl-20'
}`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-6">
          
          {/* --- Welcome Header & Create Button --- */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h2>
            <button
              onClick={() => navigate("/create")}
              className="flex items-center justify-center gap-2
                         px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg
                         transform transition-all duration-300 
                         hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl
                         active:scale-95"
            >
              <IconCreate />
              Create Post
            </button>
          </div>

          {/* --- Attractive Filters Section --- */}
          <div className="p-4 bg-white rounded-xl shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Student Name Search */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2"><IconSearch /></div>
                <input
                  type="text"
                  name="studentName"
                  placeholder="Search by Student"
                  value={filters.studentName}
                  onChange={handleFilterChange}
                  className={inputClass}
                />
              </div>
              {/* Company Name Search */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2"><IconSearch /></div>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Search by Company"
                  value={filters.companyName}
                  onChange={handleFilterChange}
                  className={inputClass}
                />
              </div>
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 
                           bg-gray-100 text-gray-700 font-medium rounded-lg shadow-sm
                           hover:bg-gray-200 transition-all duration-300"
              >
                <IconSliders />
                {showFilters ? "Hide" : "Show"} All Filters
              </button>
            </div>

            {/* --- Collapsible Filter Dropdowns --- */}
            {showFilters && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 mt-4 border-t border-gray-200">
                <select name="type" value={filters.type} onChange={handleFilterChange} className={selectClass}>
                  <option value="">All Types</option>
                  <option value="Internship">Internship</option>
                  <option value="PPO">PPO</option>
                  <option value="Internship+Placement">Internship+Placement</option>
                </select>
                <select name="year" value={filters.year} onChange={handleFilterChange} className={selectClass}>
                  <option value="">All Years</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
                <select name="branch" value={filters.branch} onChange={handleFilterChange} className={selectClass}>
                  <option value="">All Branches</option>
                  {branches.map((b) => (<option key={b} value={b}>{b}</option>))}
                </select>
                <select name="passoutYear" value={filters.passoutYear} onChange={handleFilterChange} className={selectClass}>
                  <option value="">All Passout Years</option>
                  {passoutYears.map((y) => (<option key={y} value={y}>{y}</option>))}
                </select>
                <select name="placementType" value={filters.placementType} onChange={handleFilterChange} className={selectClass}>
                  <option value="">All Placement Types</option>
                  <option value="On-Campus">On-Campus</option>
                  <option value="Off-Campus">Off-Campus</option>
                </select>
              </div>
            )}
          </div>

          {/* --- Attractive Experiences Grid --- */}
          <div className="relative">
            {experiences.length === 0 ? (
              // --- "No Experiences" Card ---
              <div className="flex flex-col items-center justify-center 
                            text-center bg-white shadow-2xl rounded-2xl p-10 
                            border border-gray-200"
              >
                <IconNotFound />
                <h2 className="text-2xl font-semibold mt-4 mb-2 text-gray-800">No Experiences Found</h2>
                <p className="text-gray-500">
                  Try adjusting your filters or be the first to create a post!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((exp) => (
                  // --- New Attractive Experience Card ---
                  <div
                    key={exp._id}
                    onClick={() => navigate(`/experience/${exp._id}`)}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden 
                               transform transition-all duration-300 
                               hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Card Header - Company Name */}
                    <div className="p-5 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 truncate">
                        {exp.companyName || "N/A"}
                      </h3>
                    </div>

                    {/* Card Body - Details */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {exp.student?.name || "N/A"}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                          {exp.branch || "N/A"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          Year: <strong>{exp.year || "N/A"}</strong>
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          Passout: <strong>{exp.passoutYear || "N/A"}</strong>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                         <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                          {exp.type || "N/A"}
                        </span>
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                          {exp.placementType || "N/A"}
                        </span>
                      </div>
                    </div>
                    
                    {/* Card Footer - Upload Date */}
                    <div className="p-5 bg-gray-50 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Uploaded:{" "}
                        {exp.createdAt
                          ? new Date(exp.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;