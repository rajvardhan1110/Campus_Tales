// src/components/AuthCard.jsx
import React from 'react'

const AuthCard = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}

export default AuthCard
