import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartProvider.jsx'
import { useUser } from '../context/UserProvider.jsx'

export default function Navbar() {
  const { cart ,remove} = useCart()
  const { user , setUser } = useUser()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (query.trim()) {

      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="brand">
          <span className="brand__dot"></span>
          <span className="brand__name">
            Addis<span className="brand__name-accent">Eats</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/" end className="nav__link">
            Home
          </NavLink>
          <Link to="/menu" className="nav__link">
            Menu
          </Link>
          <Link to="/#how" className="nav__link">
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
                onBlur={() => { if (!query) setSearchOpen(false) }}
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

          <Link to="/cart" className="iconbtn" aria-label={`Cart (${cart.length} items)`}>
            <img src="https://cdn-icons-png.flaticon.com/128/9219/9219671.png" alt="" />
            <span className="iconbtn__badge">{cart.length}</span>
          </Link>

          <div className="nav__account">
            <span className="iconbtn">
              <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="" />
            </span>

            {user != null ? (
              <div className="nav__account-info">
                <Link to="/profile" className="nav__account-label">
                  {user.name}
                </Link>
                <button
                  type="button"
                  className="nav__signout-btn"
                  onClick={() =>{ setUser(null)}}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav__account-label">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}