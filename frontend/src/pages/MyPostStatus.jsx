import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPostStatus = () => {
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        const res = await fetch("http://localhost:3000/api/experience/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Backend did not return an array", data);
          setMyPosts([]);
          setLoading(false);
          return;
        }

        // Only include posts that belong to the logged-in user
        const userPosts = data.filter(
          (post) =>
            post.student &&
            post.student._id &&
            post.student._id.toString() === userId.toString()
        );

        // Sort by creation date descending
        const sortedPosts = userPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setMyPosts(sortedPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setMyPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [navigate]);

  if (loading) return <div className="p-5 text-gray-600">Loading posts...</div>;
  if (myPosts.length === 0) return <div className="p-5 text-gray-600">No posts found.</div>;

  return (
    <div className="p-5 bg-gray-100 dark:bg-gray-700">
      <h2 className="text-2xl font-bold mb-4 p-5 flex flex-wrap justify-center items-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-300 rounded-b-lg shadow-md">
        My Posts Status
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPosts.map((post) => {
          // Determine status color
          const statusColor =
            post.status === "approved"
              ? "bg-green-50 border-l-4 border-green-500"
              : post.status === "rejected"
              ? "bg-red-50 border-l-4 border-red-500"
              : "bg-yellow-50 border-l-4 border-yellow-500";

          return (
            <div
              key={post._id}
              onClick={() => navigate(`/experience/${post._id}`)}
              className={`p-4 rounded shadow cursor-pointer hover:shadow-lg hover:-translate-y-1 transition flex flex-col ${statusColor}`}
            >
              <h3 className="font-semibold text-indigo-600 mb-1 break-words">
                {post.companyName || "N/A"}
              </h3>
              <p className="text-gray-700 mb-1">Type: {post.type || "N/A"}</p>
              <p className="text-gray-700 mb-1">Year: {post.student?.year || "N/A"}</p>
              <p className="text-gray-700 mb-1">Branch: {post.branch || "N/A"}</p>
              <p className="text-gray-700 mb-1">Passout Year: {post.passoutYear || "N/A"}</p>
              <p
                className={`text-sm mt-auto font-medium ${
                  post.status === "approved"
                    ? "text-green-600"
                    : post.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {post.status || "N/A"}
              </p>
            </div>
          );
        })}
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

export default MyPostStatus;
