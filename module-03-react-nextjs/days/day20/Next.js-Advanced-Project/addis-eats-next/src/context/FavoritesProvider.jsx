'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'fav_items'

export default function FavoritesProvider({ children }) {
  const [favourites, setFav] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setFav(Array.isArray(stored) ? stored : [])
    } catch {
      setFav([])
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites, ready])

  // Adds the dish to favourites, or removes it if it is already there.
  function addItemtoFavourites(dish) {
    setFav((prev) =>
      prev.some((item) => item.id === dish.id)
        ? prev.filter((item) => item.id !== dish.id)
        : [...prev, dish]
    )
  }

  return (
    <FavoritesContext.Provider value={{ favourites, setFav, ready, addItemtoFavourites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>')
  return ctx
}
