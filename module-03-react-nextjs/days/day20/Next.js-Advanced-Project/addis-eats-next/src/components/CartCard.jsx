'use client'

import { useState } from 'react'
import { formatETB } from '@/lib/pricing'

export default function CartCard({ item, cartqty, remove }) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="cart-item">
      <div className="cart-item__media">
        {item.image && !imageFailed ? (
          <img
            src={item.image}
            alt={item.title}
            className="cart-item__media-img"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="cart-item__emoji">{item.emoji}</span>
        )}
      </div>

      <div className="cart-item__body">
        <div className="cart-item__head">
          <h3 className="cart-item__title">{item.title}</h3>
          <span className="cart-item__price">{formatETB(item.price * item.qty)}</span>
        </div>
        <p className="cart-item__desc">{item.description}</p>

        <div className="cart-item__foot">
          <div className="qty-stepper">
            <button type="button" className="qty-stepper__btn" onClick={() => cartqty(item.id, 'sub')}>−</button>
            <span className="qty-stepper__val">{item.qty}</span>
            <button type="button" className="qty-stepper__btn" onClick={() => cartqty(item.id, 'add')}>+</button>
          </div>

          <button type="button" className="cart-item__remove" onClick={() => remove(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
