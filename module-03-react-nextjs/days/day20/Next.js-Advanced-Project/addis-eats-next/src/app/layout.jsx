import './globals.css'
import Providers from '@/context/Providers'

export const metadata = {
  title: { default: 'Addis Eats', template: '%s · Addis Eats' },
  description: 'Authentic Ethiopian food, delivered to your door.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
