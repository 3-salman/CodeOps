import React from 'react'
import Navbar from '../components/Navbar'

const items = [
  {
    id: 1,
    name: 'Doro Wat',
    desc: 'Slow-braised chicken in berbere sauce',
    price: 14.5,
    qty: 2,
    emoji: '🍛',
    c1: '#C73E1D',
    c2: '#7A1F0A',
  },
  {
    id: 2,
    name: 'Shiro',
    desc: 'Spiced chickpea stew, served with injera',
    price: 11.0,
    qty: 1,
    emoji: '🥘',
    c1: '#E5A50A',
    c2: '#9C2F15',
  },
  {
    id: 3,
    name: 'Tibs Platter',
    desc: 'Pan-seared beef with onions and peppers',
    price: 16.0,
    qty: 1,
    emoji: '🍲',
    c1: '#3F5A21',
    c2: '#7A1F0A',
  },
]

const DELIVERY_FEE = 3.5
const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
const total = subtotal + DELIVERY_FEE

function CartPage() {
  return (
    <div>
      <Navbar/>
    <div className="cart-page-wrapper">
      <div className="cart-page-container">
        <div className="cart-page-header">
          <p className="eyebrow">Your Order</p>
          <h1 className="section-title">
            Ready to <em>checkout</em>?
          </h1>
        </div>

        <div className="cart-page-layout">
          <div className="cart-page-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div
                  className="cart-item__media"
                  style={{ '--c1': item.c1, '--c2': item.c2 }}
                >
                  <span className="cart-item__emoji">{item.emoji}</span>
                </div>

                <div className="cart-item__body">
                  <div className="cart-item__head">
                    <h3 className="cart-item__title">{item.name}</h3>
                    <span className="cart-item__price">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                  <p className="cart-item__desc">{item.desc}</p>

                  <div className="cart-item__foot">
                    <div className="qty-stepper">
                      <button type="button" className="qty-stepper__btn" disabled>
                        −
                      </button>
                      <span className="qty-stepper__val">{item.qty}</span>
                      <button type="button" className="qty-stepper__btn" disabled>
                        +
                      </button>
                    </div>

                    <button type="button" className="cart-item__remove" disabled>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

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

            <button type="button" className="btn btn--primary btn--lg cart-page-checkout">
              Proceed to Checkout
            </button>

            <a href="#" className="link-arrow cart-page-continue">
              ← Continue shopping
            </a>
          </aside>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CartPage