import React from 'react'

// A thematic icon for "CampusTales" (university/building)
const AuthLogoIcon = () => (
  <svg 
    className="w-12 h-12 text-blue-600" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" 
    />
  </svg>
)

const AuthCard = ({ title, children }) => {
  return (
    // --- New Attractive Card Style ---
    <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
      
      {/* --- Logo/Icon Area --- */}
      <div className="flex justify-center mb-4">
        <AuthLogoIcon />
      </div>

      {/* --- New Themed Title --- */}
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        {title}
      </h2>
      
      {children}
    </div>
  )
}

export default AuthCard