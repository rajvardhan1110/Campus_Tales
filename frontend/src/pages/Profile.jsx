import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);

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

        const postsRes = await fetch("http://localhost:3000/api/experience", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const posts = await postsRes.json();
        const myPostsFiltered = posts.filter(p => p.student._id === data._id);
        setMyPosts(myPostsFiltered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">{user.name}'s Profile</h1>
      <p className="mb-4">Email: {user.email}</p>
      <p className="mb-4">Role: {user.role}</p>
      <p className="mb-4">Posts Created: {myPosts.length}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">My Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myPosts.map(post => (
          <div key={post._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h3 className="font-bold text-indigo-600">{post.companyName}</h3>
            <p>Type: {post.type}</p>
            <p>Status: {post.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
