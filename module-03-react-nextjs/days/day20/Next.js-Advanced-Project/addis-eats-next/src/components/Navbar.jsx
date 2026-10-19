'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartProvider'
import { useUser } from '@/context/UserProvider'

export default function Navbar() {
  const { cart } = useCart()
  const { user, signOut } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  function handleSearchSubmit(e) {
    e.preventDefault()
    const term = query.trim()
    if (term) {
      router.push(`/menu?q=${encodeURIComponent(term)}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  function handleSignOut() {
    signOut()
    router.push('/')
  }

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link href="/" className="brand">
          <span className="brand__dot"></span>
          <span className="brand__name">
            Addis<span className="brand__name-accent">Eats</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <Link href="/" className={`nav__link${pathname === '/' ? ' is-active' : ''}`}>
            Home
          </Link>
          <Link
            href="/menu"
            className={`nav__link${pathname.startsWith('/menu') ? ' is-active' : ''}`}
          >
            Menu
          </Link>
          <Link href="/#how" className="nav__link">
            How it works
          </Link>
        </nav>

        <div className="nav__actions">
          {searchOpen ? (
            <form className="nav__search" onSubmit={handleSearchSubmit}>
              <img
                className="nav__search-icon"
                src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
                alt=""
              />
              <input
                type="text"
                className="nav__search-input"
                placeholder="Search dishes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => {
                  if (!query) setSearchOpen(false)
                }}
                autoFocus
              />
            </form>
          ) : (
            <button
              type="button"
              className="iconbtn"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <img src="https://cdn-icons-png.flaticon.com/128/54/54481.png" alt="" />
            </button>
          )}

          <Link href="/cart" className="iconbtn" aria-label={`Cart (${cart.length} items)`}>
            <img src="https://cdn-icons-png.flaticon.com/128/9219/9219671.png" alt="" />
            <span className="iconbtn__badge">{cart.length}</span>
          </Link>

          <div className="nav__account">
            <Link
              href={user ? '/profile' : '/login'}
              className="iconbtn"
              aria-label={user ? 'Your profile' : 'Sign in'}
            >
              <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="" />
            </Link>

            {user ? (
              <div className="nav__account-info">
                <Link href="/profile" className="nav__account-label">
                  {user.name}
                </Link>
                <button type="button" className="nav__signout-btn" onClick={handleSignOut}>
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/login" className="nav__account-label">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
