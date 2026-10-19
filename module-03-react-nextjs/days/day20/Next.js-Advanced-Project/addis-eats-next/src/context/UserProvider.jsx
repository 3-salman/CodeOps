'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext(null)
const STORAGE_KEY = 'user'

export default function UserProvider({ children }) {
  const [user, setUserState] = useState(null)
  // `ready` is false until the saved session has been read. The route guard
  // waits for it, otherwise a page refresh would always bounce you to /login.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
      setUserState(stored)
    } catch {
      setUserState(null)
    }
    setReady(true)
  }, [])

  function setUser(next) {
    setUserState(next)
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(STORAGE_KEY)
  }

  function signOut() {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, signOut, ready }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>')
  return ctx
}
