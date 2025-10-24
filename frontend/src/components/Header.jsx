import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for logout

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    // --- New Attractive Header Style ---
    // Clean white background with a subtle bottom border
    <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-5 py-4">
      
      {/* Left Section: Hamburger Menu + Title */}
      <div className="flex items-center gap-4">
        {/* --- New SVG Hamburger Icon --- */}
        <button
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* --- Themed Title --- */}
        <h1 className="text-xl font-bold text-blue-600 hidden sm:block">
          CampusTales
        </h1>
      </div>

      {/* Right Section: Logout Button */}
      <div className="flex items-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 
                     bg-gray-100 rounded-lg shadow-sm
                     hover:bg-gray-200 hover:shadow-md 
                     transform transition-all duration-300 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;