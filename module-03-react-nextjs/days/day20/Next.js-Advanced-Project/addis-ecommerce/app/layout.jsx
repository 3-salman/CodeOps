import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartProvider'
import { SITE_URL } from '@/lib/site'
import { Suspense } from 'react'

export const metadata = {
  metadataBase: new URL(SITE_URL), // makes every preview image url absolute
  title: { default: 'Addis-Ecommerce — Laptops and Computers in Addis', template: '%s · Addis-Ecommerce' },
  description: 'Laptops, gaming laptops, desktops and mini PCs with local delivery in Addis Ababa.',
  openGraph: { siteName: 'Addis-Ecommerce', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <Suspense fallback={"loding"}>
          <main className="page">
            <div className="container">{children}</div>
          </main>
          </Suspense>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}