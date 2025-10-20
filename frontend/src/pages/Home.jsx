import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const buttonClasses = `
    px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg 
    hover:bg-gray-100 hover:scale-105 hover:shadow-lg 
    active:scale-95 active:shadow-inner 
    transition-all duration-200
  `

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <h1 className="text-5xl font-bold text-white mb-8 text-center">
        Welcome to CampusTales!
      </h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <button onClick={() => navigate('/register')} className={buttonClasses}>
          Register
        </button>

        <button onClick={() => navigate('/login')} className={buttonClasses}>
          Login
        </button>

        <button onClick={() => localStorage.removeItem('token')} className={buttonClasses}>
          Clear Token
        </button>
      </div>
    </div>
  )
}

export default Home
