'use client'

import Link from 'next/link'
import DishCard from '@/components/DishCard'
import { useFavorites } from '@/context/FavoritesProvider'

export default function FavoritesScreen() {
  const { favourites, ready } = useFavorites()

  return (
    <div className="menu-page-wrapper">
      <div className="menu-page-container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Saved For Later</p>
            <h1 className="section-title">Your <em>favorites</em></h1>
          </div>
        </div>

        {!ready ? (
          <p className="login-page-status">Loading…</p>
        ) : favourites.length === 0 ? (
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">♡</span>
            <h3>No favorites yet</h3>
            <p>Tap the heart on any dish to save it here.</p>
            <Link href="/menu" className="btn btn--primary btn--lg">Browse the menu</Link>
          </div>
        ) : (
          <div className="cards menu-page-cards">
            {favourites.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
