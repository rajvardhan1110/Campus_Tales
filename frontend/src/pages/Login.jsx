import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

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

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')

      localStorage.setItem('token', data.token)
      setMessage('Login successful. Redirecting...')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthCard title="Login">
      {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{error}</p>}
      {message && <p className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit}>
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
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account? <a href="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">Register</a>
        </p>
      </form>
    </AuthCard>
  )
}

export default Login
