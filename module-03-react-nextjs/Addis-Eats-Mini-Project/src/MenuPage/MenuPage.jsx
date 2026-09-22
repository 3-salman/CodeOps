import { useEffect, useState } from 'react'
import DishCard from '../components/DishCard.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useCart } from '../context/CartProvider.jsx'
import { useFavorites } from '../context/FavoritesProvider.jsx'

const categories = ['All', 'Stews', 'Meat', 'Vegan', 'Bakery', 'Drinks', 'Desserts', 'Favorites']



function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    // const Favorites_item=useContext(FavoritesContext);
    const { cart, addItemtocart   }=  useCart();
    const { favourites, addItemtoFavourites } = useFavorites();
    // const Cart_item=  useContext(CartContext);
    // const CartState= Cart_item ? Array.isArray(Cart_item) ? true : false : null
    // const[favourites, setFavourites]=useState(Array.isArray(Favorites_item)? Favorites_item.length === 0? null :Favorites_item:[{...Favorites_item}] )
    const [data, setData]=useState([])
    const [isLoading, setLoading]=useState(false)
    const [inCart , setCart]=useState(false)//CartState === null ? false : CartState === true ? true : false)

  //  console.log(Cart_item.incart)

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
                                 incart : cart.some((cartItem) => cartItem.id === item.id) //CartState === null ? false : CartState === true ? Cart_item.some((cart)=>cart.id === item.id) : Cart_item.id === item.id //Cart_item? Array.isArray(Cart_item) ? Cart_item.some((cart)=>cart.id === item.id): Cart_item.id === item.id: false
}))

     
   const filteredDishes =
    activeCategory === 'All'
      ? newdish
      : activeCategory === 'Favorites'? favourites : newdish.filter((dish) => dish.category.toLowerCase()  === activeCategory.toLowerCase())
      


  return (
    <div>
      <Navbar/>
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
                onClick={() => setActiveCategory(cat)}
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
    <Footer/>
    </div>
  )
}

export default MenuPage