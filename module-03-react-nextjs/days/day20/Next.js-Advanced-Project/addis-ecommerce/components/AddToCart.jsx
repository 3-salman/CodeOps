'use client'

import { useState } from 'react'
import { useCart } from './CartProvider'

export default function AddToCart({ product }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(product, qty)
    setAdded(true)
    // setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="add-to-cart">
      <div className="qty">
        <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
        <span>{qty}</span>
        <button onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</button>
      </div>

      <button className="btn" onClick={handleAdd} disabled={product.stock === 0}>
        {added ? 'Added ✓' : 'Add to cart'}
      </button>
    </div>
  )
}