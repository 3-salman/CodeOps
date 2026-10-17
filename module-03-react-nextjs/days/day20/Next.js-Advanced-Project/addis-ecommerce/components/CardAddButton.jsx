'use client'

import { useState } from 'react'
import { useCart } from './CartProvider'

// The "Add to cart" button on each product card.
export default function CardAddButton({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleClick() {
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button className="card-btn" onClick={handleClick} disabled={product.stock === 0}>
      {product.stock === 0 ? 'Out of stock' : added ? 'Added ✓' : 'Add to cart'}
    </button>
  )
}