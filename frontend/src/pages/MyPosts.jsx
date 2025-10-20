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
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Approved Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPosts.map(post => (
          <div key={post._id} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold text-indigo-600">{post.companyName}</h3>
            <p>Type: {post.type}</p>
            <p>{post.experienceText}</p>
            <p className="text-sm text-gray-500 mt-2">Status: {post.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
