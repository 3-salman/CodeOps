'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartProvider'
import { useUser } from '@/context/UserProvider'
import { validateCheckout } from '@/lib/validate'
import { DELIVERY_FEE, cartSubtotal, formatETB } from '@/lib/pricing'
import Field from './Field'

// Loaded lazily by CheckoutScreen (next/dynamic) — it's the lazy-loaded route.
export default function CheckoutForm() {
  const { cart, clearCart } = useCart()
  const { user } = useUser()
  const [values, setValues] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })
  const [touched, setTouched] = useState({})
  const [order, setOrder] = useState(null)

  const errors = validateCheckout(values)
  const subtotal = cartSubtotal(cart)
  const total = subtotal + DELIVERY_FEE

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }
  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
  }
  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ fullName: true, email: true, phone: true, address: true })
    if (Object.keys(errors).length > 0) return
    setOrder({ id: `#AE-${Date.now().toString().slice(-4)}`, total })
    clearCart()
  }
  const err = (name) => (touched[name] ? errors[name] : undefined)

  if (order) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-page-container">
          <div className="cart-page-empty">
            <span className="cart-page-empty-emoji">✅</span>
            <h3>Order {order.id} confirmed</h3>
            <p>Thanks, {values.fullName}! Total paid: {formatETB(order.total)}.</p>
            <Link href="/menu" className="btn btn--primary btn--lg">Order more</Link>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-page-container">
          <div className="cart-page-empty">
            <span className="cart-page-empty-emoji">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add a few dishes before checking out.</p>
            <Link href="/menu" className="btn btn--primary btn--lg">Browse the menu</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-container">
        <div className="cart-page-header">
          <div>
            <p className="eyebrow">Checkout</p>
            <h1 className="section-title">Delivery <em>details</em></h1>
          </div>
        </div>

        <div className="cart-page-layout">
          <form className="login-page-form" onSubmit={handleSubmit} noValidate>
            <Field label="Full name" id="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur} error={err('fullName')} />
            <Field label="Email" id="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={err('email')} />
            <Field label="Phone" id="phone" type="tel" value={values.phone} onChange={handleChange} onBlur={handleBlur} error={err('phone')} />
            <Field label="Delivery address" id="address" value={values.address} onChange={handleChange} onBlur={handleBlur} error={err('address')} />
            <button type="submit" className="login-page-button">Place order · {formatETB(total)}</button>
          </form>

          <aside className="cart-page-summary">
            <h3 className="cart-page-summary__title">Your order</h3>
            {cart.map((i) => (
              <div className="cart-page-summary__row" key={i.id}>
                <span>{i.title} × {i.qty}</span>
                <span>{formatETB(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="cart-page-summary__divider" />
            <div className="cart-page-summary__row"><span>Delivery fee</span><span>{formatETB(DELIVERY_FEE)}</span></div>
            <div className="cart-page-summary__row cart-page-summary__row--total"><span>Total</span><span>{formatETB(total)}</span></div>
          </aside>
        </div>
      </div>
    </div>
  )
}
