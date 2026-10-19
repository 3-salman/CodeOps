'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'Cart'

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  // `ready` flips to true once localStorage has been read. Until then the
  // cart is empty on both server and client, so hydration always matches.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setCart(Array.isArray(stored) ? stored : [])
    } catch {
      setCart([])
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart, ready])

  // Used by the "Add +" button on a dish card: adds the dish, or removes it
  // if it is already in the cart.
  function addItemtocart(dish) {
    setCart((prev) =>
      prev.some((item) => item.id === dish.id)
        ? prev.filter((item) => item.id !== dish.id)
        : [...prev, { ...dish, qty: 1 }]
    )
  }

  // Used by the dish page: adds `qty` of a dish, or increases its quantity.
  function addItemWithQty(dish, qty = 1) {
    setCart((prev) =>
      prev.some((item) => item.id === dish.id)
        ? prev.map((item) =>
            item.id === dish.id ? { ...item, qty: item.qty + qty } : item
          )
        : [...prev, { ...dish, qty }]
    )
  }

  // Plus / minus buttons in the cart. Going below 1 removes the line.
  function cartqty(id, op) {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item
          return { ...item, qty: op === 'add' ? item.qty + 1 : item.qty - 1 }
        })
        .filter((item) => item.qty > 0)
    )
  }

  function remove(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, ready, addItemtocart, addItemWithQty, cartqty, remove, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
