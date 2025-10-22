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

        const res = await fetch("http://localhost:3000/api/experience/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("Backend did not return an array", data);
          setMyPosts([]);
          setLoading(false);
          return;
        }

        // Filter only pending or rejected posts
        const userPosts = data.filter(
          (post) => post.status === "pending" || post.status === "rejected"
        );

        setMyPosts(userPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [navigate]);

  if (loading) {
    return <div className="p-5">Loading posts...</div>;
  }

  if (myPosts.length === 0) {
    return <div className="p-5">No pending or rejected posts found.</div>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Post Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPosts.map((post) => (
          <div key={post._id} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold text-indigo-600">{post.companyName || "N/A"}</h3>
            <p>Type: {post.type || "N/A"}</p>
            <p>Year: {post.student?.year || "N/A"}</p>
            <p>{post.experienceText || "No description provided"}</p>
            <p className="text-sm text-gray-500 mt-2">
              Status: <span className={post.status === "pending" ? "text-yellow-600" : "text-red-600"}>
                {post.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPostStatus;
