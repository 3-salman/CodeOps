import { useSearchParams } from 'react-router-dom'
import DishCard from '../components/DishCard.jsx'
import { useCart } from '../context/CartProvider.jsx'
import { useFavorites } from '../context/FavoritesProvider.jsx'
import useFetch from '../hooks/useFetch.js'
const categories = ['All', 'Stews', 'Meat', 'Vegan', 'Bakery', 'Drinks', 'Desserts', 'Favorites']



function MenuPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeCategory = searchParams.get('category') || 'All'
    const { cart, addItemtocart   }=  useCart();
    const { favourites, addItemtoFavourites } = useFavorites();
  
    const { data, isLoading, error } = useFetch('/menu.json')
    

    const newdish = (data || []).map((item) => ({
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

        {isLoading && <p>Loading menu...</p>}

        {error && (
         <div className="menu-page-empty">
    <h3>Something went wrong</h3>
    <p>{error}</p>
        </div>
        )}

        {!isLoading && !error && filteredDishes.length === 0 && (
          <div className="menu-page-empty">
            <span className="menu-page-empty-emoji">🍽️</span>
            <h3>No dishes here yet</h3>
            <p>Try a different category.</p>
        </div>
        )}

        {!isLoading && !error && filteredDishes.length > 0 && (
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