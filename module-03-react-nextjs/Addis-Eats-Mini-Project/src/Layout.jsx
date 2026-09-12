import React from 'react'

function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', textDecoration: 'none' }}>
            🇪🇹 Addis Eats
          </Link>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Home</Link>
            <Link to="/menu" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Menu</Link>
            <Link to="/cart" style={{ textDecoration: 'none' }} className="btn btn-secondary">
              🛒 Cart <span className="badge">{cartItemCount}</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container" style={{ flex: 1, padding: '32px 16px' }}>
        <Outlet />
      </main>

      <footer style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div className="container">
          <p>© {new Date().getFullYear()} Addis Eats. Authentic Flavors from Addis Ababa.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout