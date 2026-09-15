// import { useCart } from '../context/CartContext.jsx'
import { FavoritesContext } from '../context/FavoritesContext.jsx'
import { useContext, useState } from 'react'

export default function DishCard({ dish }) {
    const [Favourites_filter, setFavourites]=useState(dish)


    function setter(){
      setFavourites(Favourites_filter.favorited == true? {...Favourites_filter, favorited:false}:{...Favourites_filter, favorited:true}
      )
       
      const fav_items=JSON.parse(localStorage.getItem("fav_items"))
      const check_items=fav_items || Array.isArray(fav_items) ? fav_items : [fav_items]
      const new_items=[...fav_items, Favourites_filter ]
      localStorage.setItem("fav_items", JSON.stringify(new_items))
    }

    // console.log(dish)

    const favorited=0

  function onclickhandler(){
      setFavourites()

  }
  return (
    <article className="card">
      <div className="card__media" >
        <span className="card__emoji">{dish.emoji}</span>
        {/* <span className="card__tag">{dish.tag}</span> */}
      </div>
      <div className="card__body">
        <header className="card__head">
          <h3 className="card__title">{dish.title}</h3>
          <span className="card__price">
            {dish.price} <em>ETB</em>
          </span>
        </header>
        <p className="card__desc">{dish.description}</p>
        <footer className="card__foot">
          <button className={dish.favorited ? "fav-btn is-active" : "fav-btn"} onClick={()=>setter()}>
      {Favourites_filter.favorited ? (
         <img src="https://cdn-icons-png.flaticon.com/128/8215/8215309.png" alt="favorited" />
       ) : (
         <img src="https://cdn-icons-png.flaticon.com/128/3625/3625284.png" alt="not favorited" />
      )}
      </button>
          <button className="btn btn--primary btn--sm" onClick={() => addItem(dish)}>
            Add +
          </button>
        </footer>
      </div>
    </article>
  )
}
