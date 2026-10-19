import Link from 'next/link'
import { dishes } from '@/data/dishes'
import DishCard from './DishCard'

export default function SpecialsGrid() {
  return (
    <section className="specials" id="specials">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Today on the menu</p>
            <h2 className="section-title">Today's <em>specials</em></h2>
          </div>
          <Link href="/menu" className="link-arrow"> View full menu </Link>
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
