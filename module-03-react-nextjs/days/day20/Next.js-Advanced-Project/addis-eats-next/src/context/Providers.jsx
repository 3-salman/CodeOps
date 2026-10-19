'use client'

import UserProvider from './UserProvider'
import CartProvider from './CartProvider'
import FavoritesProvider from './FavoritesProvider'

// One client boundary that wraps the whole app, so the root layout itself
// can stay a server component.
export default function Providers({ children }) {
  return (
    <UserProvider>
      <CartProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </CartProvider>
    </UserProvider>
  )
}
