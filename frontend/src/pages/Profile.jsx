import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ analyticsData }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div className="flex h-screen items-center justify-center text-gray-600">Loading...</div>;

  const analytics = analyticsData || { total: 0, approved: 0, pending: 0, rejected: 0 };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700">
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-2xl shadow-xl w-full max-w-lg text-white flex flex-col items-center">
        {/* User Info */}
        <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
        <p className="text-lg mb-1">{user.email}</p>
        <p className="text-lg mb-6">Role: {user.role}</p>

        {/* Analytics */}
        <div className="w-full flex flex-wrap justify-center gap-4 mb-6">
          <div className="bg-white text-black p-4 rounded shadow min-w-[120px] flex flex-col items-center">
            <span>Total Posts</span>
            <span className="font-bold text-xl">{analytics.total}</span>
          </div>
          <div className="bg-white text-black p-4 rounded shadow min-w-[120px] flex flex-col items-center">
            <span>Approved</span>
            <span className="font-bold text-xl">{analytics.approved}</span>
          </div>
          <div className="bg-white text-black p-4 rounded shadow min-w-[120px] flex flex-col items-center">
            <span>Pending</span>
            <span className="font-bold text-xl">{analytics.pending}</span>
          </div>
          <div className="bg-white text-black p-4 rounded shadow min-w-[120px] flex flex-col items-center">
            <span>Rejected</span>
            <span className="font-bold text-xl">{analytics.rejected}</span>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-auto bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Profile;
