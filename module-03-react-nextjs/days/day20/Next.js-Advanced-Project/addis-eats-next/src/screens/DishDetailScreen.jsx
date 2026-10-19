'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import { useCart } from '@/context/CartProvider'
import { formatETB } from '@/lib/pricing'

export default function DishDetailScreen() {
  const { id } = useParams()
  const { data, loading, error, retry } = useFetch('/menu.json')
  const { addItemWithQty } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  const dish = data?.find((item) => String(item.id) === String(id)) || null
  const ingredients = Array.isArray(dish?.ingredients) ? dish.ingredients : []

  function handleAdd() {
    addItemWithQty(dish, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="dish-detail-wrapper">
      <div className="dish-detail-container">
        <Link href="/menu" className="link-arrow dish-detail-back">← Back to menu</Link>

        {loading && <p className="login-page-status">Loading…</p>}

        {!loading && error && (
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">⚠️</span>
            <h3>Couldn't load this dish</h3>
            <p>{error}</p>
            <button type="button" className="btn btn--primary btn--lg" onClick={retry}>Retry</button>
          </div>
        )}

        {!loading && !error && !dish && (
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">🍽️</span>
            <h3>Dish not found</h3>
            <p>It may have been removed from the menu.</p>
          </div>
        )}

        {!loading && dish && (
          <div className="dish-detail-layout">
            <div className="dish-detail-media">
              {dish.image && !imageFailed ? (
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="dish-detail-media-img"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <span className="dish-detail-emoji">{dish.emoji}</span>
              )}
            </div>

            <div className="dish-detail-body">
              <span className="dish-detail-category">{dish.category}</span>
              <h1 className="dish-detail-title">{dish.title}</h1>
              <span className="dish-detail-price">{formatETB(dish.price)}</span>
              <p className="dish-detail-desc">{dish.description}</p>

              <div className="dish-detail-meta">
                <span>⏱ {dish.cookingTime || '20–30 min'}</span>
                <span>🌶️ {dish.spiceLevel || 'Medium'}</span>
              </div>

              {ingredients.length > 0 && (
                <div className="dish-detail-ingredients">
                  {ingredients.map((ing) => (
                    <span key={ing} className="chip">{ing}</span>
                  ))}
                </div>
              )}

              <div className="dish-detail-actions">
                <div className="qty-stepper">
                  <button type="button" className="qty-stepper__btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <span className="qty-stepper__val">{qty}</span>
                  <button type="button" className="qty-stepper__btn" onClick={() => setQty((q) => q + 1)}>+</button>
                </div>

                <button type="button" className="btn btn--primary btn--lg" onClick={handleAdd}>
                  {added ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
