import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { Suspense } from 'react'

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <ErrorBoundary key={location.pathname}>
          <Suspense fallback={<p>Loading page...</p>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}

export default Layout