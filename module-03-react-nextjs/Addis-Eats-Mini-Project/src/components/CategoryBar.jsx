import { categories } from '../data/dishes.js'

export default function CategoryBar() {
  return (
    <section className="cats">
      <div className="container">
        <div className="cats__row" role="tablist" aria-label="Categories">
          {categories.map((c, i) => (
            <button
              key={c.id}
              className={`chip${i === 0 ? ' is-active' : ''}`}
              role="tab"
              aria-selected={i === 0}
            >
              {c.icon && <span aria-hidden="true">{c.icon} </span>}
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
