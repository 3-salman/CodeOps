import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import  {useCart}  from '../context/CartProvider'
import { Link } from 'react-router-dom'
import CartCard from './CartCard'
import CartSummary from './CartSummary'
import PaymentModal from './PaymentModal'

const DELIVERY_FEE = 50

function CartPage() {

  const {cart , cartqty, clearCart, remove} = useCart()
  const [showPayment, setShowPayment] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal + DELIVERY_FEE

  return (

    <div>
    <div className="cart-page-wrapper">
      <div className="cart-page-container">
        <div className="cart-page-header">
          <div>
            <p className="eyebrow">Your Order</p>
            <h1 className="section-title">
              Ready to <em>checkout</em>?
            </h1>
          </div>

          {cart.length > 0 && (
            <button
              type="button"
              className="btn btn-secondary btn--sm cart-clear-btn"
              onClick={() => clearCart()}
            >
              Remove All
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="cart-page-empty">
            <span className="cart-page-empty-emoji">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add a few dishes and they'll show up here.</p>
            <Link to="/menu" className="btn btn--primary btn--lg">
              Browse the menu
            </Link>
          </div>
        ) : (
          <div className="cart-page-layout">
            <div className="cart-page-items">
              {cart.map((item) => (
                <CartCard key={item.id} item={item} cartqty={cartqty} remove={remove} />
              ))}
            </div>

            <CartSummary cart={cart} onCheckout={() => setShowPayment(true)} />
          </div>
        )}

      </div>
    </div>

    <PaymentModal
      isOpen={showPayment}
      onClose={() => setShowPayment(false)}
      subtotal={subtotal}
      deliveryFee={DELIVERY_FEE}
      total={total}
    />

    </div>
  )
}

export default CartPage