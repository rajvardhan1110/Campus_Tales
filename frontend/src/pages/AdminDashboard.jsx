import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalExperiences: 0,
    totalApproved: 0,
    totalPending: 0,
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const token = localStorage.getItem("token");

  // Fetch pending posts
  const fetchPendingPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/experience/admin/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPendingPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch analytics
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
    try {
      await fetch(`http://localhost:3000/api/experience/admin/approve/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingPosts();
      fetchAnalytics();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/experience/admin/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingPosts();
      fetchAnalytics();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPendingPosts();
    fetchAnalytics();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-5">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

          {/* Analytics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-indigo-500 text-white rounded shadow">
              Total Users: {analytics.totalUsers}
            </div>
            <div className="p-4 bg-purple-500 text-white rounded shadow">
              Total Posts: {analytics.totalExperiences}
            </div>
            <div className="p-4 bg-green-500 text-white rounded shadow">
              Approved: {analytics.totalApproved}
            </div>
            <div className="p-4 bg-red-500 text-white rounded shadow">
              Pending: {analytics.totalPending}
            </div>
          </div>

          {/* Pending Posts */}
          <h3 className="text-xl font-bold mb-3">Pending Posts</h3>
          <div className="space-y-4">
            {pendingPosts.length === 0 && <p>No pending posts</p>}
            {pendingPosts.map((post) => (
              <div key={post._id} className="p-4 bg-white rounded shadow">
                <p><strong>Company:</strong> {post.companyName}</p>
                <p><strong>Type:</strong> {post.type}</p>
                <p><strong>By:</strong> {post.student.name} ({post.student.email})</p>
                <p><strong>Experience:</strong> {post.experienceText}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => approvePost(post._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
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
