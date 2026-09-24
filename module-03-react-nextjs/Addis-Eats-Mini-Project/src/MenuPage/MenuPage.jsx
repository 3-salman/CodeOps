import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DishCard from '../components/DishCard.jsx'
import { useCart } from '../context/CartProvider.jsx'
import { useFavorites } from '../context/FavoritesProvider.jsx'

const categories = ['All', 'Stews', 'Meat', 'Vegan', 'Bakery', 'Drinks', 'Desserts', 'Favorites']



function MenuPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeCategory = searchParams.get('category') || 'All'
    const { cart, addItemtocart   }=  useCart();
    const { favourites, addItemtoFavourites } = useFavorites();
    const [data, setData]=useState([])
    const [isLoading, setLoading]=useState(false)
    const [inCart , setCart]=useState(false)

    useEffect(
      ()=>{

          const fetchData = async () => {

      try {
        setLoading(true);
        // 2. Fetch from the public directory root
        const response = await fetch('menu.json');
        
        if (!response.ok) {
          // throw new Error(`HTTP error! status: ${response.status}`);
          console.log("error")
        }
        
        const resposeData = await response.json();
        setData(resposeData);
        
      } catch (err) {
        // Only update error state if the request wasn't intentionally aborted
        if (err.name !== 'AbortError') {
          console.log('error')
        }
      } finally {
        setLoading(false);
      }
      }
      
      fetchData()

    },[] )

    const newdish = data.map((item) => ({
                                 ...item,
                                 favorited: favourites.some((fav) => fav.id === item.id),
                                 incart : cart.some((cartItem) => cartItem.id === item.id) 
}))

     
   const filteredDishes =
    activeCategory === 'All'
      ? newdish
      : activeCategory === 'Favorites'? favourites : newdish.filter((dish) => dish.category.toLowerCase()  === activeCategory.toLowerCase())
      


  return (
    <div>
    <div className="menu-page-wrapper">
      <div className="menu-page-container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Full Menu</p>
            <h1 className="section-title">
              Every dish, <em>freshly made</em>
            </h1>
          </div>

          
        </div>

        <div className="cats">
          <div className="cats__row">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip${activeCategory === cat ? ' is-active' : ''}`}
                onClick={() =>
                  setSearchParams(cat === 'All' ? {} : { category: cat })
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading && "loading..."}
        {filteredDishes.length === 0 ? (
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">🍽️</span>
            <h3>No dishes here yet</h3>
            <p>Try a different category.</p>
          </div>
        ) : (
          <div className="cards menu-page-cards">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} addItemtocart={addItemtocart} addItemtoFavourites={addItemtoFavourites} />
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default MenuPage