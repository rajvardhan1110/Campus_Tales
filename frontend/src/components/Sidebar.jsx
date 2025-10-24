import React from 'react'
import { useNavigate } from 'react-router-dom'

// Enhanced NavLink component with better hover effects
const NavLink = ({ to, icon, text, isExpanded }) => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className={`group flex items-center w-full h-12 text-gray-600 
                 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600
                 border-l-4 border-transparent hover:border-blue-600
                 transform transition-all duration-300 ease-out
                 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-sm
                 ${isExpanded ? 'px-5' : 'justify-center'}`}
    >
      <span className="flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span 
        className={`ml-4 font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
          isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        } group-hover:font-semibold`}
      >
        {text}
      </span>
    </button>
  )
}

// Main Enhanced Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const token = localStorage.getItem('token')
  let user = null;
  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1]));
    } catch {}
  }

  // Enhanced Icon Components with consistent styling
  const IconAdmin = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 18H7.5m3-6h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 12H7.5" /></svg>
  const IconProfile = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
  const IconMyPosts = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V7.5A2.25 2.25 0 015.625 5.25h3.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H5.625v-1.5z" /></svg>
  const IconPostStatus = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375m0 0h3.75M10.125 2.25v3.75M10.125 6h3.75m0 0v3.75m0-3.75h3.75m0 0v3.75M6.375 12h3.75m0 0v3.75m0-3.75h3.75m0 0v3.75M6.375 12v3.75m0 0h3.75" /></svg>
  const IconLogo = <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>

  // Enhanced Sidebar Classes
  const sidebarClasses = `
    fixed top-0 left-0 h-screen bg-white shadow-xl border-r border-gray-200
    flex flex-col z-40 
    transition-all duration-300 ease-in-out
    transform hover:shadow-2xl
    
    md:translate-x-0
    ${isOpen ? 'w-64' : '-translate-x-full md:w-20'}
  `

  return (
    <aside className={sidebarClasses}>
      {/* Enhanced Logo Area */}
      <div className={`flex items-center h-20 mt-2 overflow-hidden transition-all duration-300 ${
          isOpen ? 'px-6' : 'justify-center'
      }`}>
        <span className="flex-shrink-0">{IconLogo}</span>
        <span 
          className={`ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent 
                     whitespace-nowrap transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          } hover:from-blue-700 hover:to-purple-700`}
        >
          CampusTales
        </span>
      </div>

      {/* Enhanced Close button for mobile */}
      {isOpen && (
        <button 
          onClick={toggleSidebar}
          className="absolute top-5 right-4 md:hidden text-gray-500 hover:text-gray-800
                    transform transition-all duration-300 hover:scale-110 hover:bg-gray-100 
                    p-1 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Enhanced Navigation Links */}
      <nav className="flex-1 mt-6 space-y-1 px-2">
        {user?.role === "admin" ? (
          <>
            <NavLink to="/admin-dashboard" icon={IconAdmin} text="Admin" isExpanded={isOpen} />
          </>
        ) : (
          <>
            <NavLink to="/profile" icon={IconProfile} text="Profile" isExpanded={isOpen} />
            <NavLink to="/dashboard/myposts" icon={IconMyPosts} text="My Posts" isExpanded={isOpen} />
            <NavLink to="/dashboard/mypoststatus" icon={IconPostStatus} text="Post Status" isExpanded={isOpen} />
          </>
        )}
      </nav>

      {/* Enhanced Spacer with decorative element */}
      <div className="mt-auto p-4">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent 
                       transform transition-all duration-500 hover:via-blue-300 mb-4">
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;