import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const IconNotFound = () => <svg className="w-16 h-16 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m-1.125 0H6.625A2.25 2.25 0 004.5 4.875v11.25a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0019.5 16.125v-1.5" /></svg>
const IconDashboard = () => <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>

const MyPosts = () => {
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/experience", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allPosts = response.data;
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      const userApprovedPosts = allPosts.filter(
        post => post.student?._id === userId && post.status === "approved"
      );
      setMyPosts(userApprovedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800">
      <div className="flex-1 flex flex-col transition-all duration-300">
      
        
        <main className="flex-1 flex flex-col p-6 overflow-hidden">
          
          {/* Fixed Title */}
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex-shrink-0">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Posts
            </span>
          </h2>
          
          {/* Scrolling Content Area */}
          <div className="relative flex-1 overflow-y-auto">
            {loading ? (
              <div className="text-center text-gray-600 font-medium text-xl">
                Loading posts...
              </div>
            ) : myPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center 
                            text-center bg-white shadow-xl rounded-2xl p-12 
                            border border-gray-200">
                <IconNotFound />
                <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">
                  No Approved Posts
                </h2>
                <p className="text-gray-500 max-w-md leading-relaxed">
                  Your approved posts will appear here once they are reviewed and approved by our team.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPosts.map(post => (
                  <div
                    key={post._id}
                    onClick={() => navigate(`/experience/${post._id}`)}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden 
                               transition-all duration-300 ease-out
                               hover:shadow-xl
                               cursor-pointer border border-gray-100 hover:border-gray-200"
                  >
                    {/* Card Header - ATTRACTIVE Company Name Section */}
                    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-50 
                                  border-b-2 border-blue-200">
                      <div className="relative">
                        {/* Decorative corner accents */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-300 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-300 rounded-full opacity-20"></div>
                        
                        {/* Company Name with solid background */}
                        <div className="relative">
                          <h3 className="text-2xl font-bold text-gray-900 truncate mb-1 
                                       bg-gradient-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">
                            {post.companyName || "N/A"}
                          </h3>
                          

                        </div>
                      </div>
                    </div>

                    {/* Card Body - Details */}
                    <div className="p-5 space-y-3">
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                          {post.branch || "N/A"}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          Passout: <strong>{post.passoutYear || "N/A"}</strong>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                         <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                          {post.type || "N/A"}
                        </span>
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                          Status: <strong className="capitalize">{post.status}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Card Footer - Upload Date */}
                    <div className="p-5 bg-gray-50 border-t border-gray-200
                                  transition-all duration-300 group-hover:bg-gray-100">
                      <p className="text-xs text-gray-500">
                        Uploaded:{" "}
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Fixed Button Area */}
          {!loading && (
            <div className="flex justify-center pt-8 mt-6 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => navigate('/dashboard')}
                className="group flex items-center justify-center gap-3
                           px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl 
                           border border-gray-300 shadow-lg
                           transition-all duration-300 ease-out
                           hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-xl
                           hover:border-gray-400
                           active:scale-95"
              >
                <IconDashboard />
                <span className="transition-transform duration-300 group-hover:scale-105">
                  Back to Dashboard
                </span>
              </button>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MyPosts;