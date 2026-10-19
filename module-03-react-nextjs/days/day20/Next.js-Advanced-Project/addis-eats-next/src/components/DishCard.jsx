'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartProvider'
import { useFavorites } from '@/context/FavoritesProvider'

export default function DishCard({ dish }) {
  const { cart, addItemtocart } = useCart()
  const { favourites, addItemtoFavourites } = useFavorites()
  const [imageFailed, setImageFailed] = useState(false)

  // Whether this dish is in the cart / favourites is derived from the shared
  // lists, so every card stays in sync without props being passed down.
  const incart = cart.some((item) => item.id === dish.id)
  const favorited = favourites.some((item) => item.id === dish.id)

  return (
    <article className="card">
      <Link href={`/menu/${dish.id}`}>
        <div className="card__media">
          {dish.image && !imageFailed ? (
            <img
              src={dish.image}
              alt={dish.title}
              className="card__media-img"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="card__emoji">{dish.emoji}</span>
          )}
        </div>
      </Link>

      <div className="card__body">
        <header className="card__head">
          <h3 className="card__title">{dish.title}</h3>
          <span className="card__price">
            {dish.price} <em>ETB</em>
          </span>
        </header>
        <p className="card__desc">{dish.description}</p>

        <footer className="card__foot">
          <button
            type="button"
            className={favorited ? 'fav-btn is-active' : 'fav-btn'}
            onClick={() => addItemtoFavourites(dish)}
            aria-label={favorited ? 'Remove from favourites' : 'Add to favourites'}
            aria-pressed={favorited}
          >
            {favorited ? (
              <img src="https://cdn-icons-png.flaticon.com/128/8215/8215309.png" alt="" />
            ) : (
              <img src="https://cdn-icons-png.flaticon.com/128/3625/3625284.png" alt="" />
            )}
          </button>

          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={() => addItemtocart(dish)}
          >
            {incart ? 'Carted' : 'Add +'}
          </button>
        </footer>
      </div>
    </article>
  )
}
