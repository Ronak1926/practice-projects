import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) return
    await login({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">Welcome back</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            className={`w-full py-2 rounded-md text-white ${isLoggingIn ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition`}
          >
            {isLoggingIn ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage

