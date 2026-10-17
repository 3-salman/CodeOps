import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/CartProvider'
import { Suspense } from 'react'

export const metadata = {
  title: { default: 'VoltMart — Laptops and Computers in Addis', template: '%s · VoltMart' },
  description: 'Laptops, gaming laptops, desktops and mini PCs with local delivery in Addis Ababa.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="page">
            {/* <Suspense fallback={<p>Loading posts...</p>}> */}
                 <div className="container">{children}</div>
           {/* </Suspense> */}
           
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}