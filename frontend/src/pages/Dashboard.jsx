import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [filters, setFilters] = useState({
    companyName: "",
    type: "",
    order: "recent",
  });
  const [showCreate, setShowCreate] = useState(false);
  const [newPost, setNewPost] = useState({
    companyName: "",
    type: "Internship",
    experienceText: "",
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const token = localStorage.getItem("token");

  // Fetch all approved experiences
  const fetchExperiences = async () => {
    try {
      let query = "";
      Object.keys(filters).forEach((key) => {
        if (filters[key]) query += `${key}=${filters[key]}&`;
      });
      const res = await fetch(`http://localhost:3000/api/experience?${query}`);
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleCreateChange = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const submitPost = async () => {
    try {
      if (!token) return alert("Please login first");
      await fetch("http://localhost:3000/api/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });
      setShowCreate(false);
      setNewPost({ companyName: "", type: "Internship", experienceText: "" });
      fetchExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [filters]);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header toggleSidebar={toggleSidebar} />

        {/* Filter Section */}
        <div className="p-5 flex flex-col sm:flex-row gap-4 items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-lg shadow-md">
          <input
            type="text"
            name="companyName"
            placeholder="Company"
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
          <select
            name="order"
            value={filters.order}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Create Post */}
        <div className="p-5 flex justify-end">
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Create Post
          </button>
        </div>

        {showCreate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-indigo-600">
                Create Experience
              </h2>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={newPost.companyName}
                onChange={handleCreateChange}
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none"
              />
              <select
                name="type"
                value={newPost.type}
                onChange={handleCreateChange}
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none"
              >
                <option value="Internship">Internship</option>
                <option value="PPO">PPO</option>
              </select>
              <textarea
                name="experienceText"
                placeholder="Your Experience"
                value={newPost.experienceText}
                onChange={handleCreateChange}
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={submitPost}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Experiences */}
        <div className="p-5 flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-2 text-indigo-600">
                {exp.companyName}
              </h3>
              <p>Type: {exp.type}</p>
              <p>{exp.experienceText}</p>
              <p className="text-sm text-gray-500 mt-2">By: {exp.student.name}</p>
              <p className="text-sm text-gray-500 mt-1">Status: {exp.status}</p>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
