import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [filter, setFilter] = useState({
    search: "",
    type: "",
    year: "",
    status: "",
    date: "",
  });

  const token = localStorage.getItem("token");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/experience/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    }
  };

  const approvePost = async (id) => {
    await fetch(`http://localhost:3000/api/admin/experience/approve/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchExperiences();
    fetchAnalytics();
  };

  const rejectPost = async (id) => {
    await fetch(`http://localhost:3000/api/admin/experience/reject/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchExperiences();
    fetchAnalytics();
  };

  useEffect(() => {
    fetchExperiences();
    fetchAnalytics();
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch =
      exp.companyName.toLowerCase().includes(filter.search.toLowerCase()) ||
      exp.student.name.toLowerCase().includes(filter.search.toLowerCase());
    const matchesType = filter.type ? exp.type === filter.type : true;
    const matchesYear = filter.year ? exp.student.year === filter.year : true;
    const matchesStatus = filter.status ? exp.status === filter.status : true;
    const matchesDate = filter.date
      ? new Date(exp.createdAt).toLocaleDateString() ===
        new Date(filter.date).toLocaleDateString()
      : true;

    return matchesSearch && matchesType && matchesYear && matchesStatus && matchesDate;
  });

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-5">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

          {/* Analytics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <div className="p-4 bg-indigo-500 text-white rounded shadow">
              Total Users: {analytics.totalUsers || 0}
            </div>
            <div className="p-4 bg-purple-500 text-white rounded shadow">
              Total Posts: {analytics.totalExperiences || 0}
            </div>
            <div className="p-4 bg-green-500 text-white rounded shadow">
              Approved: {analytics.totalApproved || 0}
            </div>
            <div className="p-4 bg-red-500 text-white rounded shadow">
              Pending: {analytics.totalPending || 0}
            </div>
            <div className="p-4 bg-gray-500 text-white rounded shadow">
              Rejected: {analytics.totalRejected || 0}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <input
              name="search"
              placeholder="Search by student or company"
              value={filter.search}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            />
            <select
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Types</option>
              <option value="Internship">Internship</option>
              <option value="PPO">PPO</option>
            </select>
            <select
              name="year"
              value={filter.year}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Years</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
            <select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <input
              type="date"
              name="date"
              value={filter.date}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            />
          </div>

          {/* Experience List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.length === 0 && <p>No posts found.</p>}
            {filteredExperiences.map((post) => (
              <div key={post._id} className="p-4 bg-white rounded shadow">
                <p><strong>Company:</strong> {post.companyName}</p>
                <p><strong>Type:</strong> {post.type}</p>
                <p><strong>Student:</strong> {post.student.name} ({post.student.email})</p>
                <p><strong>Year:</strong> {post.year || "N/A"}</p>
                <p><strong>Experience:</strong> {post.experienceText}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      post.status === "approved"
                        ? "text-green-600"
                        : post.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {post.status}
                  </span>
                </p>

                {post.status === "pending" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => approvePost(post._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectPost(post._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
