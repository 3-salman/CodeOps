import React from 'react'

function PaymentModal({ isOpen, onClose, subtotal, deliveryFee, total }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h3 className="modal-title">Payment</h3>
        <p className="modal-subtitle">Complete your order</p>

        <div className="modal-summary">
          <div className="modal-summary__row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="modal-summary__row">
            <span>Delivery fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="modal-summary__divider" />
          <div className="modal-summary__row modal-summary__row--total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="modal-field">
          <label htmlFor="cardName">Name on card</label>
          <input type="text" id="cardName" placeholder="Sara Bekele" />
        </div>

        <div className="modal-field">
          <label htmlFor="cardNumber">Card number</label>
          <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" />
        </div>

        <div className="modal-field-row">
          <div className="modal-field">
            <label htmlFor="cardExpiry">Expiry</label>
            <input type="text" id="cardExpiry" placeholder="MM/YY" />
          </div>
          <div className="modal-field">
            <label htmlFor="cardCvc">CVC</label>
            <input type="text" id="cardCvc" placeholder="123" />
          </div>
        </div>

        <button type="button" className="btn btn--primary btn--lg modal-pay-btn">
          Pay ${total.toFixed(2)}
        </button>
      </div>
    </div>
  )
}

export default PaymentModal