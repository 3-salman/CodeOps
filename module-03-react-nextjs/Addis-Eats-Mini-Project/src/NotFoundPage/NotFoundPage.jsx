import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function NotFoundPage() {
  return (
    <div>
      <div className="menu-page-wrapper">
        <div className="menu-page-container">
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">🧭</span>
            <h3>Page not found</h3>
            <p>The page you're looking for doesn't exist or may have moved.</p>
            <Link to="/" className="btn btn--primary btn--lg">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage