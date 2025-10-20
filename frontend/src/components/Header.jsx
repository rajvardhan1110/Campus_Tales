import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-5 py-3">
      {/* Hamburger menu for toggling sidebar */}
      <button
  className="text-blue-800 text-2xl focus:outline-none"
  onClick={toggleSidebar}
>
  ☰
</button>

      {/* Title / Logo */}
      <h1 className="text-xl font-bold text-indigo-600">CampusTales Dashboard</h1>

      {/* Optional right section for profile/settings */}
      <div className="flex items-center gap-4">
        {/* Example: could add notification bell, profile avatar, etc. */}
      </div>
    </header>
  );
};

export default Header;
