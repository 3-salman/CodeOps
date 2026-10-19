'use client'

// Route-level error boundary: catches render errors in any (site) page.
export default function SiteError({ error, reset }) {
  return (
    <div className="menu-page-wrapper">
      <div className="menu-page-container">
        <div className="menu-page-empty">
          <span className="menu-page-empty-emoji">⚠️</span>
          <h3>Something went wrong</h3>
          <p>{error?.message || 'An unexpected error occurred.'}</p>
          <button type="button" className="btn btn--primary btn--lg" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
