import React from 'react'
import { Link } from 'react-router-dom'

function CartSummary({ cart }) {
  // Calculate subtotal, delivery fee, and total
  const DELIVERY_FEE = 3.5;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + DELIVERY_FEE;

  return (
    <aside className="cart-page-summary">
            <h3 className="cart-page-summary__title">Order Summary</h3>

            <div className="cart-page-summary__row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-page-summary__row">
              <span>Delivery fee</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>

            <div className="cart-page-summary__divider" />

            <div className="cart-page-summary__row cart-page-summary__row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn btn--primary btn--lg cart-page-checkout">
              Proceed to Checkout
            </Link>

            <Link to="/menu" className="link-arrow cart-page-continue">
              ← Continue shopping
            </Link>
          </aside>
  )
}

export default CartSummary