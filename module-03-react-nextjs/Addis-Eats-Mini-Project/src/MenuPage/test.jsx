import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const dish = {
  id: 'doro-wot',
  title: 'Doro Wot',
  price: 320,
  category: 'stews',
  emoji: '🥘',
  description:
    'Slow-stewed chicken drumstick in a berbere-spiced sauce with hard-boiled egg and injera.',
  prepTime: '35 min',
  spiceLevel: 'Medium',
  serving: '1–2 people',
  ingredients: ['Chicken', 'Berbere spice', 'Onion', 'Garlic', 'Boiled egg', 'Niter kibbeh'],
  note: 'A slow-cooked family recipe — the sauce is simmered for hours to build its deep, spiced flavor.',
}

function Test() {
  return (
    <div>
      <Navbar />
      <div className="dish-detail-wrapper">
        <div className="dish-detail-container">
          <Link to="/menu" className="link-arrow dish-detail-back">
            ← Back to menu
          </Link>

          <div className="dish-detail-layout">
            <div className="dish-detail-media">
              <span className="dish-detail-emoji">{dish.emoji}</span>
            </div>

            <div className="dish-detail-body">
              <span className="dish-detail-category">{dish.category}</span>
              <h1 className="dish-detail-title">{dish.title}</h1>
              <span className="dish-detail-price">${dish.price.toFixed(2)}</span>
              <p className="dish-detail-desc">{dish.description}</p>

              <ul className="dish-detail-meta">
                <li className="dish-detail-meta__item">
                  <strong>{dish.prepTime}</strong>
                  <span>Prep time</span>
                </li>
                <li className="dish-detail-meta__item">
                  <strong>{dish.spiceLevel}</strong>
                  <span>Spice level</span>
                </li>
                <li className="dish-detail-meta__item">
                  <strong>{dish.serving}</strong>
                  <span>Serving size</span>
                </li>
              </ul>

              <div className="dish-detail-divider" />

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

              <div className="dish-detail-note">
                <strong>Chef's note</strong>
                <p>{dish.note}</p>
              </div>

              <div className="dish-detail-actions">
                <div className="qty-stepper">
                  <button type="button" className="qty-stepper__btn" disabled>
                    −
                  </button>
                  <span className="qty-stepper__val">1</span>
                  <button type="button" className="qty-stepper__btn" disabled>
                    +
                  </button>
                </div>

                <button type="button" className="btn btn--primary btn--lg" disabled>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Test