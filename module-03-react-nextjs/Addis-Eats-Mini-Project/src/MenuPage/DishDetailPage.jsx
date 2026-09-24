import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartProvider.jsx'

function DishDetailPage() {
  const { id } = useParams()
  const { addToCartWithQty } = useCart()

  const [dish, setDish] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const fetchDish = async () => {
      try {
        setLoading(true)
        const response = await fetch('/menu.json')
        if (!response.ok) {
          throw new Error('Bad response')
        }
        const data = await response.json()
        const foundDish = data.find((item) => String(item.id) === String(id))
        setDish(foundDish || null)
      } catch (err) {
        setError('Failed to fetch dish data')
      } finally {
        setLoading(false)
      }
    }

    fetchDish()
  }, [id])

  const handleAdd = () => {
    addToCartWithQty(dish, qty)
  }

  return (
    <div>
      <div className="dish-detail-wrapper">
        <div className="dish-detail-container">
          <Link to="/menu" className="link-arrow dish-detail-back">
            ← Back to menu
          </Link>

          {isLoading && <p>Loading...</p>}

          {!isLoading && !error && !dish && (
            <div className="menu-page-empty">
              <span className="menu-page-empty-emoji">🍽️</span>
              <h3>Dish not found</h3>
              <p>It may have been removed from the menu.</p>
            </div>
          )}

          {!isLoading && !error && dish && (
            <div className="dish-detail-layout">
              <div className="dish-detail-media">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="dish-detail-media-img"
                />
              </div>

              <div className="dish-detail-body">
                <span className="dish-detail-category">{dish.category}</span>
                <h1 className="dish-detail-title">{dish.title}</h1>
                <span className="dish-detail-price">{dish.price?.toFixed(2)} ETB</span>
                <p className="dish-detail-desc">{dish.description}</p>

                <div className="dish-detail-actions">
                  <div className="qty-stepper">
                    <button
                      type="button"
                      className="qty-stepper__btn"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <span className="qty-stepper__val">{qty}</span>
                    <button
                      type="button"
                      className="qty-stepper__btn"
                      onClick={() => setQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn--primary btn--lg"
                    onClick={handleAdd}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DishDetailPage