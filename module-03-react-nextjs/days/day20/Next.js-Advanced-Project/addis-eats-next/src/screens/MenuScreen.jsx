'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import DishCard from '@/components/DishCard'
import useFetch from '@/hooks/useFetch'
import { useFavorites } from '@/context/FavoritesProvider'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'stews', label: 'Stews' },
  { id: 'meat', label: 'Meat' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'favorites', label: 'Favorites' },
]

export default function MenuScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const category = (params.get('category') || 'all').toLowerCase()
  const q = (params.get('q') || '').trim().toLowerCase()

  const { data, loading, error, retry } = useFetch('/menu.json')
  const { favourites } = useFavorites()

  function selectCategory(id) {
    const next = new URLSearchParams(params.toString())
    if (id === 'all') next.delete('category')
    else next.set('category', id)
    const qs = next.toString()
    router.push(qs ? `/menu?${qs}` : '/menu')
  }

  const source = category === 'favorites' ? favourites : data || []
  const dishes = source.filter((d) => {
    if (category !== 'all' && category !== 'favorites' && d.category?.toLowerCase() !== category)
      return false
    if (q && !`${d.title} ${d.description}`.toLowerCase().includes(q)) return false
    return true
  })

  return (
    <div className="menu-page-wrapper">
      <div className="menu-page-container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Full Menu</p>
            <h1 className="section-title">Every dish, <em>freshly made</em></h1>
          </div>
        </div>

        <div className="cats">
          <div className="cats__row">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`chip${category === t.id ? ' is-active' : ''}`}
                onClick={() => selectCategory(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {q && (
          <p className="login-page-status">
            Results for “{params.get('q')}” —{' '}
            <Link href={category === 'all' ? '/menu' : `/menu?category=${category}`} className="link-arrow">
              clear search
            </Link>
          </p>
        )}

        {loading && category !== 'favorites' ? (
          <p className="login-page-status">Loading menu…</p>
        ) : error && category !== 'favorites' ? (
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">⚠️</span>
            <h3>Couldn't load the menu</h3>
            <p>{error}</p>
            <button type="button" className="btn btn--primary btn--lg" onClick={retry}>Retry</button>
          </div>
        ) : dishes.length === 0 ? (
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">🍽️</span>
            <h3>No dishes here yet</h3>
            <p>Try a different category.</p>
          </div>
        ) : (
          <div className="cards menu-page-cards">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
