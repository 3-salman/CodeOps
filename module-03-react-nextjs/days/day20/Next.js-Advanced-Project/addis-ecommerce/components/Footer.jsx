import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div className="footer-col">
          <h3>VoltMart</h3>
          <p>Laptops and computers with local delivery in Addis Ababa.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link href="/products">All products</Link>
          <Link href="/products?category=laptops">Laptops</Link>
          <Link href="/products?category=gaming">Gaming laptops</Link>
          <Link href="/products?category=desktops">Desktops</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/about">About us</Link>
          <Link href="/signin">Sign in</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>support@voltmart.example</p>
          <p>+251 900 000 000</p>
          <p>Bole, Addis Ababa</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">© 2026 VoltMart. All rights reserved.</div>
      </div>
    </footer>
  )
}