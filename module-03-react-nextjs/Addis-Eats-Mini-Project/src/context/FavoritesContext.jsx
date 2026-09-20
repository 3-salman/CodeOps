import { createContext } from 'react'



const Favitem_state= localStorage.getItem("fav_items") ? JSON.parse( localStorage.getItem("fav_items")) : null 

export const FavoritesContext = createContext(Favitem_state)

