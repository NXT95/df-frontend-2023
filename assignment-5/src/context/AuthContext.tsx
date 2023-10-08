'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface IAuthContext {
  user: {
    email: string
    password: string
  } | null
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem('user') ?? 'null'))
    } catch (error) {
      setError('parse data from localStorage fail')
    }
  }, [])

  if (error) {
    return <h1>{error.toUpperCase()}</h1>
  }

  return <AuthContext.Provider value={{ user }} {...props} />
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }

  return context
}

export { AuthProvider, useAuth }
