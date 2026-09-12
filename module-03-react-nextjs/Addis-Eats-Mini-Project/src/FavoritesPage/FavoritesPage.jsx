import React, { useState } from 'react'
import DishCard from '../components/DishCard.jsx'
import { FavoritesContext} from '../context/FavoritesContext.jsx'
import {useContext} from 'react'

const favoriteDishes = [
  {
    id: 1,
    title: 'Doro Wat',
    description: 'Slow-braised chicken in berbere sauce, served with a boiled egg.',
    price: 380,
    emoji: '🍛',
    tag: 'Chef\u2019s pick',
  },
  {
    id: 2,
    title: 'Kitfo',
    description: 'Minced beef seasoned with mitmita and niter kibbeh, served lean or rare.',
    price: 450,
    emoji: '🥩',
    tag: 'Spicy',
  },
  {
    id: 3,
    title: 'Ethiopian Coffee',
    description: 'Traditionally brewed jebena coffee, roasted fresh to order.',
    price: 90,
    emoji: '☕',
    tag: 'Must try',
  },
]

function FavoritesPage() {
      
      const fav_item=useContext(FavoritesContext || []);
      const [fav , setFavourites]=useState(fav_item || [])
      console.log(fav)
      console.log(useContext(FavoritesContext || []))

  return (
    <div className="menu-page-wrapper">
      <div className="menu-page-container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Saved For Later</p>
            <h1 className="section-title">
              Your <em>favorites</em>
            </h1>
          </div>
        </div>

        {fav.length === 0 ? (
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">♡</span>
            <h3>No favorites yet</h3>
            <p>Tap the heart on any dish to save it here.</p>
            <a href="#" className="btn btn--primary btn--lg">
              Browse the menu
            </a>
          </div>
        ) : (
          <div className="cards menu-page-cards">
            {fav.map((dish) => (
              <FavoritesContext.Provider value={{fav , setFavourites}}>
              <DishCard key={dish.id} />   {/* dish={dish} /> */}
              </FavoritesContext.Provider>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage