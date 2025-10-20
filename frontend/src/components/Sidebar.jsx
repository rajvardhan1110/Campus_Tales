import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1]));
    } catch {}
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="w-60 bg-indigo-600 h-screen text-white flex flex-col transition-all duration-300">
      {user?.role === "admin" ? (
        <>
          <button
            className="p-4 hover:bg-indigo-700 transition text-left"
            onClick={() => navigate("/admin-dashboard")}
          >
            Admin Dashboard
          </button>
        </>
      ) : (
        <>
          <button
            className="p-4 hover:bg-indigo-700 transition text-left"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button
            className="p-4 hover:bg-indigo-700 transition text-left"
            onClick={() => navigate("/dashboard/myposts")}
          >
            My Posts
          </button>
          <button
            className="p-4 hover:bg-indigo-700 transition text-left"
            onClick={() => navigate("/dashboard/mypoststatus")}
          >
            My Post Status
          </button>
        </>
      )}

      <button
        className="mt-auto p-4 hover:bg-indigo-700 transition text-left"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
