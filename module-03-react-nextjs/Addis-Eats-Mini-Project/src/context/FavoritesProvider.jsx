import { createContext,useContext ,useState} from 'react'

const FavoritesContext = createContext(null)

function FavoritesProvider({ children }) {
    const [favourites, setFav]=useState(JSON.parse(localStorage.getItem('fav_items') || '[]'));

    function addItemtoFavourites(dish){
      const storedFavItems = favourites
      const favItems = Array.isArray(storedFavItems) ? storedFavItems : [storedFavItems]
        
      
      if(favItems.length === 0){
        localStorage.setItem('fav_items', JSON.stringify([{  ...dish, favorited:true}]))
        setFav([ {...dish, favorited:true}])
      }else if(favItems.length === 1){
        if(favItems[0].id === dish.id){
          localStorage.setItem('fav_items', JSON.stringify([]))
          setFav([])
        }else{
          const newFavItems = [...favItems, {...dish, favorited:true}]
          localStorage.setItem('fav_items', JSON.stringify(newFavItems))
          setFav(newFavItems)
        }
      }else{
        if(favItems.some((item) => item.id === dish.id)){
          const updatedFavItems = favItems.filter((item) => item.id != dish.id)
          localStorage.setItem('fav_items', JSON.stringify(updatedFavItems))
          setFav(updatedFavItems)
        }else{
          const newFavItems = [...favItems, {...dish, favorited:true}]
          localStorage.setItem('fav_items', JSON.stringify(newFavItems))
          setFav(newFavItems)
        }
      }
    }






  return (
    <FavoritesContext.Provider value={{ favourites, setFav , addItemtoFavourites}}>
        {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider

export function useFavorites() {
    return useContext(FavoritesContext)
}
// const Favitem_state= localStorage.getItem("fav_items") ? JSON.parse( localStorage.getItem("fav_items")) : null 

// export const FavoritesContext = createContext(Favitem_state)

