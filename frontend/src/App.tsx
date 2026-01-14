import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useAuth } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'

export default function App() {
  const { token, logout } = useAuth()

  return (
    <div>
      <nav className="p-4 border-b">
        <Link to="/">Home</Link>{' '}
        {!token ? (
          <>
            | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            | <button onClick={logout} className="text-sm underline">Logout</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
