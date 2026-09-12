import { createContext } from 'react'


export const FavoritesContext = createContext(
    JSON.parse(localStorage.getItem("fav_items"))
)
