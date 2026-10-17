'use client'

import Link from 'next/link'
import { useCart } from './CartProvider'

// The "Cart (2)" link in the header.
export default function CartLink() {
  const { count } = useCart()

  return (
    <Link href="/cart" className="cart-link">
      Cart
      {count > 0 && <span className="cart-count">{count}</span>}
    </Link>
  )
}