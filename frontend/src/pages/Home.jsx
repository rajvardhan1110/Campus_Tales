import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  // Updated primary button style to support icons
  const primaryButtonClasses = `
    flex items-center justify-center gap-2
    px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg
    transform transition-all duration-300 
    hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl
    active:scale-95
  `

  return (
    // Main container - overflow-hidden contains the background blobs
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 p-4 overflow-hidden">
      
      {/* --- Decorative Background Blobs --- */}
      {/* These use default pulse animation, no config needed */}
      <div 
        className="absolute top-0 -left-1/4 w-96 h-96 bg-blue-200 rounded-full 
                   opacity-50 blur-3xl filter animate-pulse"
      />
      <div 
        className="absolute bottom-0 -right-1/4 w-96 h-96 bg-purple-200 rounded-full 
                   opacity-50 blur-3xl filter animate-pulse"
        style={{ animationDelay: '2s' }} // Stagger animation start
      />
      
      {/* --- Main Content (on top of blobs) --- */}
      <main className="relative z-10 flex flex-col items-center text-center">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">CampusTales</span>!
        </h1>
        
        <p className="text-lg text-gray-600 mb-10 max-w-lg">
          Share and discover interview experiences, preparation tips, and career
          journeys from students just like you.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* --- Register Button with Icon --- */}
          <button 
            onClick={() => navigate('/register')} 
            className={primaryButtonClasses}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21c-2.305 0-4.47-.612-6.374-1.666z" />
            </svg>
            Register
          </button>

          {/* --- Login Button with Icon --- */}
          <button 
            onClick={() => navigate('/login')} 
            className={primaryButtonClasses}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Login
          </button>

          {/* Utility Button (still commented out as in your file)
          <button 
            onClick={() => localStorage.removeItem('token')} 
            className={utilityButtonClasses}
          >
            Clear Token
          </button> */}
        </div>
      </main>
    </div>
  )
}

export default Home