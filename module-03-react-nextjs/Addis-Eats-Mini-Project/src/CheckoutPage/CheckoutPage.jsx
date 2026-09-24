import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useCart } from '../context/CartProvider.jsx'

const DELIVERY_FEE = 3.5

function validate(values) {
  const errors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required'
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Full name is too short'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!/^[+\d][\d\s-]{6,}$/.test(values.phone)) {
    errors.phone = 'Enter a valid phone number'
  }

  if (!values.address.trim()) {
    errors.address = 'Delivery address is required'
  } else if (values.address.trim().length < 5) {
    errors.address = 'Address is too short'
  }

  return errors
}

function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  })
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const errors = validate(values)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = cart.length ? subtotal + DELIVERY_FEE : 0

  function handleChange(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setTouched({ fullName: true, email: true, phone: true, address: true })

    if (Object.keys(errors).length === 0) {
      clearCart()
      setOrderPlaced(true)
    }
  }

  function showError(field) {
    return (touched[field] || submitted) && errors[field]
  }

  if (orderPlaced) {
    return (
      <div>
        <div className="cart-page-wrapper">
          <div className="cart-page-container">
            <div className="cart-page-empty">
              <span className="cart-page-empty-emoji">✅</span>
              <h3>Order placed!</h3>
              <p>Thanks, {values.fullName} — your order is on its way to {values.address}.</p>
              <Link to="/" className="btn btn--primary btn--lg">
                Back to home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div>
        <div className="cart-page-wrapper">
          <div className="cart-page-container">
            <div className="cart-page-empty">
              <span className="cart-page-empty-emoji">🛒</span>
              <h3>Your cart is empty</h3>
              <p>Add a few dishes before checking out.</p>
              <Link to="/menu" className="btn btn--primary btn--lg">
                Browse the menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="cart-page-wrapper">
        <div className="cart-page-container">
          <div className="cart-page-header">
            <div>
              <p className="eyebrow">Checkout</p>
              <h1 className="section-title">
                Almost <em>there</em>
              </h1>
            </div>
          </div>

          <div className="cart-page-layout">
            <form className="cart-page-items" noValidate onSubmit={handleSubmit}>
              <div className="login-page-form-group">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(showError('fullName'))}
                />
                {showError('fullName') && (
                  <span className="field-error">{errors.fullName}</span>
                )}
              </div>

              <div className="login-page-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(showError('email'))}
                />
                {showError('email') && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>

              <div className="login-page-form-group">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(showError('phone'))}
                />
                {showError('phone') && (
                  <span className="field-error">{errors.phone}</span>
                )}
              </div>

              <div className="login-page-form-group">
                <label htmlFor="address">Delivery address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(showError('address'))}
                />
                {showError('address') && (
                  <span className="field-error">{errors.address}</span>
                )}
              </div>

              <button type="submit" className="btn btn--primary btn--lg">
                Place order
              </button>
            </form>

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

              <Link to="/cart" className="link-arrow cart-page-continue">
                ← Back to cart
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage