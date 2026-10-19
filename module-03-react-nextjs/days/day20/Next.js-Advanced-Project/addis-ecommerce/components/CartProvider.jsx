'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// The cart lives in the browser (state + localStorage). It never goes to the server.
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [ready, setReady] = useState(false)

  // Load the saved cart once, when the page opens.
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setCart(JSON.parse(saved))
    setReady(true)
  }, [])

  // Save the cart every time it changes (but only after it was loaded).
  useEffect(() => {
    if (ready) localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart, ready])

  function addToCart(product, qty) {
    const existing = cart.find((item) => item.productId === product.id)

    if (existing) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? { ...item, qty: Math.min(item.qty + qty, product.stock) }
            : item
        )
      )
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          emoji: product.emoji,
          price: product.price,
          stock: product.stock,
          qty: Math.min(qty, product.stock),
        },
      ])
    }
  }

  // amount is +1 or -1. The quantity stays between 1 and the stock.
  function changeQty(productId, amount) {
    setCart(
      cart.map((item) => {
        if (item.productId !== productId) return item
        const newQty = Math.max(1, Math.min(item.qty + amount, item.stock))
        return { ...item, qty: newQty }
      })
    )
  }

  function removeItem(productId) {
    setCart(cart.filter((item) => item.productId !== productId))
  }
  
  function removeall(){

  }

  function clearCart() {
    setCart([])
  }

  const count = cart.reduce((total, item) => total + item.qty, 0)

  return (
    <CartContext.Provider value={{ cart, ready, count, addToCart, changeQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}