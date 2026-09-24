import { useState } from 'react'
import { Link } from 'react-router-dom'


export default function DishCard({ dish , addItemtocart , addItemtoFavourites}) {

  return (
    <article className="card">
      <Link to={`/menu/${dish.id}`}>
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