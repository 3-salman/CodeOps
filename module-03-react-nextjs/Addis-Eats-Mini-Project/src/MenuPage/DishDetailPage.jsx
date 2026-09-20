import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
// import { useCart } from '../context/CartContext.jsx'

function DishDetailPage() {
  const { id } = useParams()
  const { addItem } = useCart()

  const [dish, setDish] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const fetchDish = async () => {
      try {
        setLoading(true)
        const response = await fetch('/menu.json')
        const data = await response.json()
        const found = data.find((item) => String(item.id) === String(id))
        setDish(found || null)
      } catch (err) {
        console.log('error', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDish()
  }, [id])

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem(dish)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="dish-detail-wrapper">
        <div className="dish-detail-container">
          <Link to="/menu" className="link-arrow dish-detail-back">
            ← Back to menu
          </Link>

          {isLoading && <p>Loading...</p>}

          {!isLoading && !dish && (
            <div className="menu-page-empty">
              <span className="menu-page-empty-emoji">🍽️</span>
              <h3>Dish not found</h3>
              <p>It may have been removed from the menu.</p>
            </div>
          )}

          {!isLoading && dish && (
            <div className="dish-detail-layout">
              <div className="dish-detail-media">
                <span className="dish-detail-emoji">{dish.emoji}</span>
              </div>

              <div className="dish-detail-body">
                <span className="dish-detail-category">{dish.category}</span>
                <h1 className="dish-detail-title">{dish.title}</h1>
                <span className="dish-detail-price">${dish.price?.toFixed(2)}</span>
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
      <Footer />
    </div>
  )
}

export default DishDetailPage