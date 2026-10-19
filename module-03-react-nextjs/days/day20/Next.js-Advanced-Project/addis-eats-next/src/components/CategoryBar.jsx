import Link from 'next/link'
import { categories } from '@/data/dishes'

// Each chip links to /menu with the category stored in the URL.
export default function CategoryBar() {
  return (
    <section className="cats">
      <div className="container">
        <div className="cats__row" aria-label="Categories">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={c.id === 'all' ? '/menu' : `/menu?category=${c.id}`}
              className={`chip${i === 0 ? ' is-active' : ''}`}
            >
              {c.icon && <span aria-hidden="true">{c.icon} </span>}
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
