'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from './CartProvider'
import { DELIVERY_FEE, money } from '@/lib/pricing'

export default function CheckoutForm({ name }) {
  const router = useRouter()
  const { cart, ready, clearCart } = useCart()
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!ready) return <p>Loading...</p>

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add something to your cart before checking out.</p>
        <Link href="/products" className="btn">Browse products</Link>
      </div>
    )
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Only ids and quantities are sent. The server looks up the real prices.
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map((item) => ({ productId: item.productId, qty: item.qty })),
        phone: phone,
        address: address,
      }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    clearCart()
    router.push(`/orders/${data.id}`)
  }

  return (
    <div className="cart-layout">
      <form className="form checkout-form" onSubmit={handleSubmit}>
        <h2>Delivery details</h2>

        <label>Name</label>
        <input value={name} disabled />

        <label>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+251 9..." required />

        <label>Delivery address</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, area, Addis Ababa" required />

        <p className="hint">Payment: pay on delivery.</p>
        {error && <p className="error">{error}</p>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Placing order...' : 'Place order'}
        </button>
      </form>

      <div className="cart-summary">
        <h2>Your order</h2>
        {cart.map((item) => (
          <div className="summary-row" key={item.productId}>
            <span>{item.name} × {item.qty}</span>
            <span>{money(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="summary-row">
          <span>Delivery</span>
          <span>{money(DELIVERY_FEE)}</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>{money(subtotal + DELIVERY_FEE)}</span>
        </div>
      </div>
    </div>
  )
}