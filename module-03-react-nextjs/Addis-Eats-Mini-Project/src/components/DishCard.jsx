import { useCart } from '../context/CartContext.jsx'

export default function DishCard({ dish }) {
    const favorited=1

  
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
          <button className={favorited ? "fav-btn is-active" : "fav-btn"}>
      {favorited ? (
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
