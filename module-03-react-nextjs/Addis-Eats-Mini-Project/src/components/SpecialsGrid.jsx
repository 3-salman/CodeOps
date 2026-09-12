import { dishes } from '../data/dishes.js'
import { Link } from 'react-router-dom'
import DishCard from './DishCard.jsx'

export default function SpecialsGrid() {
  return (
    <section className="specials" id="specials">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Today on the menu</p>
            <h2 className="section-title">Today's <em>specials</em></h2>
          </div>

          <Link to="/menu" className="link-arrow"> View full menu </Link>
          {/* <a className="link-arrow" href="#">
            View full menu
          </a> */}
        </div>

        <div className="cards">
          {dishes.map((d) => (
            <DishCard key={d.id} dish={d} />
          ))}
        </div>
      </div>
    </section>
  )
}
