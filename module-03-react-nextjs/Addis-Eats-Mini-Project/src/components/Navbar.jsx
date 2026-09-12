import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useState } from 'react'

export default function Navbar() {
  const { count } = useCart()
  const [isfavourite , favourite]= useState(true) // to render based on this

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
          <a href="#specials" className="nav__link">Menu</a>
          <a href="#how" className="nav__link">How it works</a>
        </nav>

        <div className="nav__actions">
          <Link to="/cart">
          <button className="iconbtn" aria-label={`Cart (20 items)`}>
            <img src="https://cdn-icons-png.flaticon.com/128/9219/9219671.png" alt="" />
            <span className="iconbtn__badge">20</span>
          </button>
          </Link>

          {/* <a className="btn btn--ghost" href="#">Sign in</a> */}
          
          <Link to="/profile" className="iconbtn" >
            <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="" />
          </Link>

          {/* <a className="btn btn--primary" href="#specials">{isfavourite?"favourites":"Order now"}</a> */}
             <a className="btn btn--primary" href="#specials">Order now</a>
        </div>
      </div>
    </header>
  )
}
