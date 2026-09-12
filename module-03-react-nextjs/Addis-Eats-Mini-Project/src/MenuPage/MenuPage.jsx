import { useEffect, useState } from 'react'
import DishCard from '../components/DishCard.jsx'
import { FavoritesContext } from '../context/FavoritesContext.jsx'
import { useContext } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const categories = ['All', 'Stews', 'Meat', 'Vegan', 'Bakery', 'Drinks', 'Desserts', 'Favorites']


// const dishes = [
//   {
//     id: 1,
//     title: 'Doro Wat',
//     description: 'Slow-braised chicken in berbere sauce, served with a boiled egg.',
//     price: 380,
//     emoji: '🍛',
//     tag: 'Chef\u2019s pick',
//     category: 'Stews',
//   },
//   {
//     id: 2,
//     title: 'Shiro',
//     description: 'Spiced chickpea stew, smooth and rich, served with injera.',
//     price: 260,
//     emoji: '🥘',
//     tag: 'Vegetarian',
//     category: 'Vegetarian',
//   },
//   {
//     id: 3,
//     title: 'Tibs Platter',
//     description: 'Pan-seared beef with onions, rosemary, and green peppers.',
//     price: 410,
//     emoji: '🍲',
//     tag: 'Popular',
//     category: 'Grilled',
//   },
//   {
//     id: 4,
//     title: 'Kitfo',
//     description: 'Minced beef seasoned with mitmita and niter kibbeh, served lean or rare.',
//     price: 450,
//     emoji: '🥩',
//     tag: 'Spicy',
//     category: 'Grilled',
//   },
//   {
//     id: 5,
//     title: 'Injera Basket',
//     description: 'Fresh sourdough flatbread, baked daily, perfect for sharing.',
//     price: 80,
//     emoji: '🫓',
//     tag: 'Staple',
//     category: 'Breads',
//   },
//   {
//     id: 6,
//     title: 'Misir Wat',
//     description: 'Red lentils simmered in berbere, a warming vegetarian classic.',
//     price: 240,
//     emoji: '🍚',
//     tag: 'Vegetarian',
//     category: 'Vegetarian',
//   },
//   {
//     id: 7,
//     title: 'Ethiopian Coffee',
//     description: 'Traditionally brewed jebena coffee, roasted fresh to order.',
//     price: 90,
//     emoji: '☕',
//     tag: 'Must try',
//     category: 'Drinks',
//   },
//   {
//     id: 8,
//     title: 'Tej',
//     description: 'Honey wine served chilled, sweet and slightly fermented.',
//     price: 150,
//     emoji: '🍯',
//     tag: 'Traditional',
//     category: 'Drinks',
//   },
// ]

// const fav=[
//   {
//     id: 1,
//     title: 'Doro Wat',
//     description: 'Slow-braised chicken in berbere sauce, served with a boiled egg.',
//     price: 380,
//     emoji: '🍛',
//     tag: 'Chef\u2019s pick',
//     category: 'Stews',
//   },
//   {
//     id: 2,
//     title: 'Shiro',
//     description: 'Spiced chickpea stew, smooth and rich, served with injera.',
//     price: 260,
//     emoji: '🥘',
//     tag: 'Vegetarian',
//     category: 'Vegetarian',
//   }

// ]

function MenuPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const Favorites_item=useContext(FavoritesContext || [] );
    const[favourites, setFavourites]=useState(Favorites_item || [] )
    const [data, setData]=useState([])
    const [isLoading, setLoading]=useState(false)

    useEffect(
      ()=>{

  const fetchData = async () => {

      try {
        setLoading(true);
        // 2. Fetch from the public directory root
        const response = await fetch('/menu.json');
        
        if (!response.ok) {
          // throw new Error(`HTTP error! status: ${response.status}`);
          console.log("error")
        }
        
        const resposeData = await response.json();
        console.log(resposeData)
        setData(resposeData);
        
      } catch (err) {
        // Only update error state if the request wasn't intentionally aborted
        if (err.name !== 'AbortError') {
          console.log('error')
        }
      } finally {
        setLoading(false);
        console.log("finnally")
      }
      }
      
      fetchData()

    },[] )



  const filteredDishes =
    activeCategory === 'All'
      ? data
      : activeCategory === 'Favorites'? favourites : data.filter((dish) => dish.category.toLowerCase()  === activeCategory.toLowerCase())
      

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
              // <FavoritesContext.Provider value={{fav_item , setFavourites}}>
              <DishCard key={dish.id} dish={dish} />
              // </FavoritesContext.Provider>
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