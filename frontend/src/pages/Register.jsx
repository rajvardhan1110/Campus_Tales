import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Redirect logged-in users
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Registration failed')

      localStorage.setItem('token', data.token)
      setMessage('Registration successful. Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthCard title="Create Account">
      {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{error}</p>}
      {message && <p className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>

        <div className="mb-8">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">Login</a>
        </p>
      </form>
    </AuthCard>
  )
}

export default Register
