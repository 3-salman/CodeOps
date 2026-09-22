import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function DishCard({ dish , addItemtocart , addItemtoFavourites}) {

    // function addItemtoFavourites(){

    //   const storedFavItems = JSON.parse(localStorage.getItem('fav_items') || '[]')
    //   const favItems = Array.isArray(storedFavItems) ? storedFavItems : [storedFavItems]

    //   if(dish.favorited){
    //      const updatedFavItems = favItems.filter((item) => item.id != dish.id) ///

    //      localStorage.setItem('fav_items', JSON.stringify(updatedFavItems))
    //      setFavourites({...dish, favorited:false})
    //   }else{
    //     const newFavItems = [...favItems, {...dish, favorited:true}]
    //     localStorage.setItem('fav_items', JSON.stringify(newFavItems))
    //     setFavourites({...dish, favorited:true})
    //   }
    // }

  
  return (
    <article className="card">
      <Link to={"menudetail"}>
      <div className="card__media" >
        
        <img src={dish.image} alt={dish.title} className="card__emoji" />
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
          <button className={dish.favorited ? "fav-btn is-active" : "fav-btn"} onClick={()=>addItemtoFavourites(dish)}>
      {dish.favorited ? (
         <img src="https://cdn-icons-png.flaticon.com/128/8215/8215309.png" alt="favorited" />
       ) : (
         <img src="https://cdn-icons-png.flaticon.com/128/3625/3625284.png" alt="not favorited" />
      )}
      </button>
          <button className="btn btn--primary btn--sm" onClick={() => addItemtocart(dish)}>
            {dish.incart ? " carted" : "Add +"}
          </button>
        </footer>
      </div>
    </article>
  )
}
