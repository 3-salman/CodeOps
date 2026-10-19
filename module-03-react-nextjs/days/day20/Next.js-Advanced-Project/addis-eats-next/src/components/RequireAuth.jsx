'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useUser } from '@/context/UserProvider'

// Guard: waits for the saved session to load, then redirects guests to /login
// with ?next= so they come back here after signing in.
export default function RequireAuth({ children }) {
  const { user, ready } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (ready && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`)
  }, [ready, user, router, pathname])

  if (!ready || !user) {
    return (
      <div className="menu-page-wrapper">
        <div className="menu-page-container"><p className="login-page-status">Loading…</p></div>
      </div>
    )
  }
  return children
}
