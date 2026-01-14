import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { useAuth } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'

export default function App() {
  const { token, logout } = useAuth()

  return (
    <div>
      <nav className="p-4 border-b flex items-center justify-between">
        <div>
          <Link to="/" className="font-semibold">Ka Globe</Link>
          {token && (
            <>
              {' '}
              | <Link to="/tasks">Tasks</Link>
            </>
          )}
        </div>

        <div>
          {!token ? (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="text-sm underline">Logout</button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
