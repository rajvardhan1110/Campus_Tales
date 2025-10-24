import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

// --- Icon for "No Posts Found" ---
const IconNotFound = () => <svg className="w-16 h-16 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m-1.125 0H6.625A2.25 2.25 0 004.5 4.875v11.25a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 16.125v-1.5" /></svg>

// --- Icon for Dashboard Button ---
const IconDashboard = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>

const MyPostStatus = () => {
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchMyPosts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/experience/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      if (!Array.isArray(data)) {
        console.error("Backend did not return an array", data);
        setMyPosts([]);
        return;
      }
      const sortedPosts = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setMyPosts(sortedPosts);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setMyPosts([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "approved":
        return {
          footer: "bg-green-50 border-t border-green-200",
          text: "text-green-700",
        };
      case "rejected":
        return {
          footer: "bg-red-50 border-t border-red-200",
          text: "text-red-700",
        };
      default: // 'pending'
        return {
          footer: "bg-yellow-50 border-t border-yellow-200",
          text: "text-yellow-700",
        };
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'md:pl-60' : 'md:pl-20'
      }`}>
        <Header toggleSidebar={toggleSidebar} />
        
        {/* --- Main content area is now a flex-col and does NOT scroll --- */}
        <main className="flex-1 flex flex-col p-6 overflow-hidden">
          
          {/* 1. Fixed Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex-shrink-0">
            My Post Status
          </h2>
          
          {/* 2. This new div is now the scrolling part */}
          <div className="relative flex-1 overflow-y-auto">
            {loading ? (
              <div className="text-center text-gray-600 font-medium text-xl">
                Loading posts...
              </div>
            ) : myPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center 
                            text-center bg-white shadow-2xl rounded-2xl p-10 
                            border border-gray-200">
                <IconNotFound />
                <h2 className="text-2xl font-semibold mt-4 mb-2 text-gray-800">No Posts Found</h2>
                <p className="text-gray-500">
                  You haven't created any posts yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPosts.map(post => {
                  const styles = getStatusStyles(post.status);
                  return (
                    <div
                      key={post._id}
                      onClick={() => navigate(`/experience/${post._id}`)}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden 
                                 transform transition-all duration-300 
                                 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="p-5 border-b border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 truncate">
                          {post.companyName || "N/A"}
                        </h3>
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                            {post.branch || "N/A"}
                          </span>
                          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                            Passout: <strong>{post.passoutYear || "N/A"}</strong>
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm">
                           <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                            {post.type || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className={`p-5 ${styles.footer}`}>
                        <p className={`text-sm font-bold uppercase ${styles.text}`}>
                          Status: {post.status || "N/A"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* 3. Fixed Button Area (with top padding and border) */}
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

export default MyPostStatus;