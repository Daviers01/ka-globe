import React, { createContext, useState, useContext } from 'react'

interface AuthContextType {
  token: string | null
  setToken: (t: string | null) => void
}

const AuthContext = createContext<AuthContextType>({ token: null, setToken: () => {} })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
