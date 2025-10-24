import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // <-- Import axios
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

// --- Icons for Stat Cards ---
const IconTotal = () => <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5m-4.5-12.75V16.5m-4.5-12.75V16.5m0 4.5h13.5M3.75 7.5h13.5m-13.5 4.5h13.5m0 4.5h-13.5" /></svg>
const IconApproved = () => <svg className="w-8 h-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
const IconPending = () => <svg className="w-8 h-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
const IconRejected = () => <svg className="w-8 h-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
const IconDashboard = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>

// --- Stat Card Component ---
const StatCard = ({ title, value, icon, colorClass }) => (
  <div className={`bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4 ${colorClass}`}>
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm font-medium text-gray-600">{title}</div>
    </div>
  </div>
);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // --- FETCHING BOTH PROFILE AND ANALYTICS DATA ---
  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      setLoading(true);

      const headers = { Authorization: `Bearer ${token}` };

      // Fetch both requests at the same time
      const profilePromise = axios.get("http://localhost:3000/api/auth/me", { headers });
      const postsPromise = axios.get("http://localhost:3000/api/experience/me", { headers });

      const [profileResponse, postsResponse] = await Promise.all([profilePromise, postsPromise]);

      // Set User Data
      setUser(profileResponse.data);

      // Calculate and Set Analytics Data
      const allPosts = Array.isArray(postsResponse.data) ? postsResponse.data : [];
      const total = allPosts.length;
      const approved = allPosts.filter(p => p.status === 'approved').length;
      const pending = allPosts.filter(p => p.status === 'pending').length;
      const rejected = allPosts.filter(p => p.status === 'rejected').length;

      setAnalytics({ total, approved, pending, rejected });

    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'md:pl-60' : 'md:pl-20'
      }`}>
        <Header toggleSidebar={toggleSidebar} />
        
        {/* --- Main content area with sticky footer button --- */}
        <main className="flex-1 flex flex-col p-6 overflow-hidden">
          
          {/* 1. Fixed Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex-shrink-0">
            My Profile
          </h2>
          
          {/* 2. Scrolling Content Area */}
          <div className="relative flex-1 overflow-y-auto">
            {loading ? (
              <div className="text-center text-gray-600 font-medium text-xl">Loading...</div>
            ) : !user ? (
              <div className="text-center text-red-600 font-medium text-xl">
                Could not load profile.
              </div>
            ) : (
              // --- Content ---
              <div>
                {/* --- User Info Card --- */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-1">{user.name}</h1>
                  <p className="text-xl text-gray-600 mb-3">{user.email}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full uppercase">
                    {user.role}
                  </span>
                </div>
                
                {/* --- Analytics Grid --- */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Post Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard title="Total Posts" value={analytics.total} icon={<IconTotal />} />
                  <StatCard title="Approved" value={analytics.approved} icon={<IconApproved />} />
                  <StatCard title="Pending" value={analytics.pending} icon={<IconPending />} />
                  <StatCard title="Rejected" value={analytics.rejected} icon={<IconRejected />} />
                </div>
              </div>
            )}
          </div>
          
          {/* 3. Fixed Button Area */}
          {!loading && (
            <div className="flex justify-center pt-6 mt-4 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center gap-2
                           px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md
                           transform transition-all duration-300 
                           hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-lg
                           active:scale-95"
              >
                <IconDashboard />
                Back to Dashboard
              </button>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Profile;