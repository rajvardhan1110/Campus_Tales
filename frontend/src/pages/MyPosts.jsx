import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await fetch("http://localhost:3000/api/experience", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const userId = JSON.parse(atob(token.split(".")[1])).id;
        const approvedPosts = data.filter(
          post => post.student._id === userId && post.status === "approved"
        );
        setMyPosts(approvedPosts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyPosts();
  }, [navigate]);

  return (
    <div className="p-5 bg-gray-100 dark:bg-gray-700" >
      <h2 className="text-2xl font-bold mb-4 p-5 flex flex-wrap justify-center items-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-b-lg shadow-md">My Approved Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPosts.length === 0 && <p>No approved posts found.</p>}

        {myPosts.map(post => (
          <div
            key={post._id}
            onClick={() => navigate(`/experience/${post._id}`)}
            className="p-5 rounded-lg shadow flex flex-col justify-between border-l-4 border-indigo-500 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition bg-white"
          >
            <p className="text-gray-700 mb-1">
              <span className="font-semibold text-gray-800">Student:</span>{" "}
              {post.student.name} ({post.student.email})
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold text-gray-800">Branch:</span>{" "}
              {post.branch || "N/A"}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold text-gray-800">Passout Year:</span>{" "}
              {post.passoutYear || "N/A"}
            </p>
            <p className="font-bold text-xl text-indigo-600 mb-2">
              {post.companyName}
            </p>
            <p className="text-gray-700 mt-auto">
              <strong>Type:</strong> {post.type} | <strong>Year:</strong>{" "}
              {post.year || "N/A"} | <strong>Status:</strong> {post.status}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate(-1)}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Back
              </button>
            </div>
    </div>
  );
};

export default MyPosts;
