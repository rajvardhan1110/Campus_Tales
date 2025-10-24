import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthCard from '../components/AuthCard'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false) // Added loading state

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true) // Set loading

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData)
      
      localStorage.setItem('token', response.data.token)
      setMessage('Login successful! Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError(err.message || 'Login failed. Please try again.')
      }
    } finally {
      setLoading(false) // Unset loading
    }
  }

  // --- New attractive input field style ---
  const inputContainerClass = "relative mb-5"
  const inputClass = `
    w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
    text-gray-900 placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-300
  `
  const inputIconClass = "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"

  // --- New attractive button style ---
  const buttonClass = `
    flex items-center justify-center w-full gap-2
    px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg
    transform transition-all duration-300 
    hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl
    active:scale-95
    disabled:opacity-70 disabled:cursor-not-allowed
  `

  return (
    // --- THEMED WRAPPER ---
    // Added background blobs for consistency
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 p-4 overflow-hidden">
      
      {/* --- Decorative Background Blobs --- */}
      <div 
        className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-200 rounded-full 
                   opacity-50 blur-3xl filter animate-pulse"
      />
      <div 
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-200 rounded-full 
                   opacity-50 blur-3xl filter animate-pulse"
        style={{ animationDelay: '2s' }}
      />
      
      {/* AuthCard component now uses the new attractive style */}
      <AuthCard title="Welcome Back">
        
        {/* --- Styled Messages --- */}
        {error && (
          <p className="border border-red-200 bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-center text-sm">
            {error}
          </p>
        )}
        {message && (
          <p className="border border-green-200 bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-center text-sm">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* --- Email Input Group --- */}
          <div className={inputContainerClass}>
            <label htmlFor="email" className="sr-only">Email</label>
            <svg className={inputIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* --- Password Input Group --- */}
          <div className={inputContainerClass}>
            <label htmlFor="password" className="sr-only">Password</label>
            <svg className={inputIconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <button
            type="submit"
            className={buttonClass}
            disabled={loading} // Disable button when loading
          >
            {/* --- Login Icon --- */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account? 
            <br />
            {/* --- THEMED LINK --- */}
            <a href="/register" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
              Register here
            </a>
          </p>
        </form>
      </AuthCard>
    </div>
  )
}

export default Login