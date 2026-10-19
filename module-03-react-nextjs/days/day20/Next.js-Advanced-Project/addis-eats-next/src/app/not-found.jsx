import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="menu-page-wrapper">
        <div className="menu-page-container">
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">🧭</span>
            <h3>404 — page not found</h3>
            <p>The page you're looking for doesn't exist.</p>
            <Link href="/" className="btn btn--primary btn--lg">Back to home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
