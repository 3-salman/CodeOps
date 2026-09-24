import {useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartProvider.jsx'
import useFetch from '../hooks/useFetch.js'

function DishDetailPage() {
  const { id } = useParams()
  const { addToCartWithQty } = useCart()

  const [qty, setQty] = useState(1)

  const { data, isLoading, error } = useFetch('/menu.json')
  const dish = data ? data.find((item) => String(item.id) === String(id)) : null

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


                <ul className="dish-detail-meta">
                  <li className="dish-detail-meta__item">
                    <strong>{dish.prepTime || 'N/A'}</strong>
                    <span>Cooking time</span>
                  </li>
                  <li className="dish-detail-meta__item">
                    <strong>{dish.spiceLevel || 'N/A'}</strong>
                    <span>Spice level</span>
                  </li>
                </ul>

                
                {dish.ingredients && dish.ingredients.length > 0 && (
                  <div className="dish-detail-section">
                    <h4>Ingredients</h4>
                    <div className="dish-detail-ingredients">
                      {dish.ingredients.map((ing) => (
                        <span className="dish-detail-ingredient" key={ing}>
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

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