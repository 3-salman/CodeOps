'use client'

import Link from 'next/link'
import { useCart } from './CartProvider'
import { DELIVERY_FEE, money } from '@/lib/pricing'

export default function CartView() {
  const { cart, ready, changeQty, removeItem, clearCart } = useCart()

  // Wait until the saved cart is loaded, so the page doesn't flash "empty".
  if (!ready) return <p>Loading your cart...</p>

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add a laptop or computer and it will show up here.</p>
        <Link href="/products" className="btn">Browse products</Link>
      </div>
    )
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0)
  const total = subtotal + DELIVERY_FEE

  return (
    <div className="cart-layout">
      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.productId}>
            <div className="cart-item-emoji">{item.emoji}</div>

            <div className="cart-item-info">
              <Link href={`/products/${item.slug}`} className="cart-item-name">{item.name}</Link>
              <p className="cart-item-price">{money(item.price)} each</p>

              <div className="cart-item-actions">
                <div className="qty">
                  <button onClick={() => changeQty(item.productId, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.productId, 1)}>+</button>
                </div>
                <button className="link-button" onClick={() => removeItem(item.productId)}>Remove</button>
              </div>
            </div>

            <div className="cart-item-total">{money(item.price * item.qty)}</div>
          </div>
        ))}

        <button className="link-button" onClick={clearCart}>Clear cart</button>
      </div>

      <div className="cart-summary">
        <h2>Order summary</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>{money(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>{money(DELIVERY_FEE)}</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>{money(total)}</span>
        </div>

        <Link href="/checkout" className="btn summary-btn">Proceed to checkout</Link>
        <Link href="/products" className="back-link">← Continue shopping</Link>
      </div>
    </div>
  )
}