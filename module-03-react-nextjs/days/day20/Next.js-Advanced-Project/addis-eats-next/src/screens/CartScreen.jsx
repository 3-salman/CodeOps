'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartProvider'
import CartCard from '@/components/CartCard'
import CartSummary from '@/components/CartSummary'

export default function CartScreen() {
  const { cart, cartqty, clearCart, remove, ready } = useCart()

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-container">
        <div className="cart-page-header">
          <div>
            <p className="eyebrow">Your Order</p>
            <h1 className="section-title">Ready to <em>checkout</em>?</h1>
          </div>

          {ready && cart.length > 0 && (
            <button type="button" className="btn btn-secondary btn--sm cart-clear-btn" onClick={clearCart}>
              Remove All
            </button>
          )}
        </div>

        {!ready ? (
          <p className="login-page-status">Loading your cart…</p>
        ) : cart.length === 0 ? (
          <div className="cart-page-empty">
            <span className="cart-page-empty-emoji">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add a few dishes and they'll show up here.</p>
            <Link href="/menu" className="btn btn--primary btn--lg">Browse the menu</Link>
          </div>
        ) : (
          <div className="cart-page-layout">
            <div className="cart-page-items">
              {cart.map((item) => (
                <CartCard key={item.id} item={item} cartqty={cartqty} remove={remove} />
              ))}
            </div>
            <CartSummary cart={cart} />
          </div>
        )}
      </div>
    </div>
  )
}
