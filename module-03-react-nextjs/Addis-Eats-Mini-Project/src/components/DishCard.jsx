import { CartContext } from '../context/CartContext.jsx'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

export default function DishCard({ dish }) {
    const [cart_filter, setCart]=useState(dish)

    

    function addItemtoFavourites(){

      const storedFavItems = JSON.parse(localStorage.getItem('fav_items') || '[]')
      const favItems = Array.isArray(storedFavItems) ? storedFavItems : [storedFavItems]

      if(cart_filter.favorited){
         const updatedFavItems = favItems.filter((item) => item.id != cart_filter.id) ///

         localStorage.setItem('fav_items', JSON.stringify(updatedFavItems))
         setFavourites({...cart_filter, favorited:false})
      }else{
        const newFavItems = [...favItems, {...cart_filter, favorited:true}]
        localStorage.setItem('fav_items', JSON.stringify(newFavItems))
        setFavourites({...cart_filter, favorited:true})
      }
    }

    function addItemtocart(){
      const storedCart = JSON.parse(localStorage.getItem('Cart') || '[]')
      const cartItems = Array.isArray(storedCart) ? storedCart : [storedCart]

      if(cart_filter.incart){
         const updatedCartItems = cartItems.filter((item) => item.id != cart_filter.id) ///

         localStorage.setItem('Cart', JSON.stringify(updatedCartItems))
         setCart({...cart_filter, incart:false})
      }else{
        const newCartItems = [...cartItems, {...cart_filter, incart:true}]
        localStorage.setItem('Cart', JSON.stringify(newCartItems))
        setCart({...cart_filter, incart:true})
      }
    }
    

  
  return (
    <article className="card">
      <Link to={"menudetail"}>
      <div className="card__media" >
        
        <img src={dish.image} alt={dish.title} className="card__emoji" />
        {/* <span className="card__emoji">{dish.image}</span> */}
        {/* <span className="card__tag">{dish.tag}</span> */}
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
          <button className={dish.favorited ? "fav-btn is-active" : "fav-btn"} onClick={()=>addItemtoFavourites()}>
      {cart_filter.favorited ? (
         <img src="https://cdn-icons-png.flaticon.com/128/8215/8215309.png" alt="favorited" />
       ) : (
         <img src="https://cdn-icons-png.flaticon.com/128/3625/3625284.png" alt="not favorited" />
      )}
      </button>
          <button className="btn btn--primary btn--sm" onClick={() => addItemtocart()}>
            {cart_filter.incart ? " carted" : "Add +"}
          </button>
        </footer>
      </div>
    </article>
  )
}
