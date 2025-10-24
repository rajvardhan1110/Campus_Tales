import React from 'react'
import { useNavigate } from 'react-router-dom'

// --- Helper component for navigation links ---
// Now centers the icon when collapsed (isExpanded={false})
const NavLink = ({ to, icon, text, isExpanded }) => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center w-full h-12 text-gray-600 
                 hover:bg-blue-50 hover:text-blue-600
                 border-l-4 border-transparent hover:border-blue-600
                 transition-all duration-200
                 ${isExpanded ? 'px-5' : 'justify-center'}`} // Centers icon when collapsed
    >
      <span className="flex-shrink-0">{icon}</span>
      <span 
        className={`ml-4 font-medium whitespace-nowrap overflow-hidden transition-opacity duration-200 ${
          isExpanded ? 'opacity-100' : 'opacity-0' // Text hides when collapsed
        }`}
      >
        {text}
      </span>
    </button>
  )
}

// --- Main Sidebar Component ---
const Sidebar = ({ isOpen, toggleSidebar }) => {
  // REMOVED: isExpanded state and mouse handlers
  const token = localStorage.getItem('token')
  let user = null;
  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1]));
    } catch {}
  }

  // --- Icon Components (unchanged) ---
  const IconAdmin = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 18H7.5m3-6h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0M3.75 12H7.5" /></svg>
  const IconProfile = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
  const IconMyPosts = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.625a2.25 2.25 0 01-2.25-2.25V7.5A2.25 2.25 0 015.625 5.25h3.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H5.625v-1.5z" /></svg>
  const IconPostStatus = <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375m0 0h3.75M10.125 2.25v3.75M10.125 6h3.75m0 0v3.75m0-3.75h3.75m0 0v3.75M6.375 12h3.75m0 0v3.75m0-3.75h3.75m0 0v3.75M6.375 12v3.75m0 0h3.75" /></svg>
  const IconLogo = <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>

  // --- UPDATED Sidebar Classes ---
  // Now controlled *only* by the `isOpen` prop
  const sidebarClasses = `
    fixed top-0 left-0 h-screen bg-white shadow-xl border-r border-gray-200
    flex flex-col z-40 
    transition-all duration-300 ease-in-out
    
    md:translate-x-0  /* Always show on desktop */
    ${isOpen ? 'w-60' : '-translate-x-full md:w-20'} /* 80px when closed on desktop */
  `

  return (
    <aside 
      className={sidebarClasses}
      // REMOVED: onMouseEnter & onMouseLeave
    >
      {/* --- Logo Area --- */}
      <div className={`flex items-center h-16 mt-4 overflow-hidden ${
          isOpen ? 'px-5' : 'justify-center' // Center logo when collapsed
      }`}>
        <span className="flex-shrink-0">{IconLogo}</span>
        <span 
          className={`ml-3 text-xl font-bold text-blue-600 whitespace-nowrap transition-opacity duration-200 ${
            isOpen ? 'opacity-100' : 'opacity-0' // Hide text when collapsed
          }`}
        >
          CampusTales
        </span>
      </div>

      {/* --- Close button for mobile --- */}
      {isOpen && (
        <button 
          onClick={toggleSidebar}
          className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}

      {/* --- Navigation Links --- */}
      <nav className="flex-1 mt-8 space-y-2">
        {user?.role === "admin" ? (
          <>
            <NavLink to="/admin-dashboard" icon={IconAdmin} text="Admin" isExpanded={isOpen} />
          </>
        ) : (
          <>
            {/* Pass `isOpen` to `isExpanded` prop */}
            <NavLink to="/profile" icon={IconProfile} text="Profile" isExpanded={isOpen} />
            <NavLink to="/dashboard/myposts" icon={IconMyPosts} text="My Posts" isExpanded={isOpen} />
            <NavLink to="/dashboard/mypoststatus" icon={IconPostStatus} text="Post Status" isExpanded={isOpen} />
          </>
        )}
      </nav>

      {/* Spacer */}
      <div className="mt-auto">
        {/* Logout button is in Header.jsx */}
      </div>
    </aside>
  );
};

export default Sidebar;