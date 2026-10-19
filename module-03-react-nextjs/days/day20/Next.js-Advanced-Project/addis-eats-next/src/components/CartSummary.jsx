import Link from 'next/link'
import { DELIVERY_FEE, cartSubtotal, formatETB } from '@/lib/pricing'

export default function CartSummary({ cart }) {
  const subtotal = cartSubtotal(cart)
  const total = subtotal + DELIVERY_FEE

  return (
    <aside className="cart-page-summary">
      <h3 className="cart-page-summary__title">Order Summary</h3>

      <div className="cart-page-summary__row">
        <span>Subtotal</span>
        <span>{formatETB(subtotal)}</span>
      </div>
      <div className="cart-page-summary__row">
        <span>Delivery fee</span>
        <span>{formatETB(DELIVERY_FEE)}</span>
      </div>

      <div className="cart-page-summary__divider" />

      <div className="cart-page-summary__row cart-page-summary__row--total">
        <span>Total</span>
        <span>{formatETB(total)}</span>
      </div>

      <Link href="/checkout" className="btn btn--primary btn--lg cart-page-checkout">
        Proceed to Checkout
      </Link>

      <Link href="/menu" className="link-arrow cart-page-continue">← Continue shopping</Link>
    </aside>
  )
}
