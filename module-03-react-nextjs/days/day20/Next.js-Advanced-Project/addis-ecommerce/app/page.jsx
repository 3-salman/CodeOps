import Link from 'next/link'
import { getProducts } from '@/lib/db'
import ProductCard from '@/components/ProductCard'

const categories = [
  { id: 'laptops', label: 'Laptops', emoji: '💻', text: 'For work and study' },
  { id: 'gaming', label: 'Gaming laptops', emoji: '🎮', text: 'Fast screens and graphics' },
  { id: 'desktops', label: 'Desktops', emoji: '🖥️', text: 'Office and gaming PCs' },
  { id: 'all-in-one', label: 'All-in-one', emoji: '🖱️', text: 'Computer and screen in one' },
  { id: 'mini-pc', label: 'Mini PCs', emoji: '🗄️', text: 'Small and quiet' },
]

// The products shown on the home page.
const featuredSlugs = ['macbook-air-m2', 'thinkpad-e14-gen-5', 'lenovo-legion-5', 'mac-mini-m2']

const perks = [
  { icon: '✅', title: '1-year warranty', text: 'On every product' },
  { icon: '🚚', title: 'Delivery in 1–2 days', text: 'Across Addis Ababa' },
  { icon: '↩️', title: '7-day returns', text: 'If an item is faulty' },
  { icon: '💳', title: 'Pay on delivery', text: 'Or by mobile money' },
]

export const metadata = {
  description: 'Shop laptops, gaming laptops, desktops, all-in-ones and mini PCs in Addis Ababa. Clear prices in ETB and a 1-year warranty.',
}

export default async function Home() {
  const products = await getProducts()
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean)

  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <h1>Laptops and computers, delivered across Addis</h1>
          <p>
            Laptops, gaming laptops, desktops and mini PCs. Real specifications, clear prices in
            birr and a one-year warranty on everything.
          </p>
          <div className="hero-buttons">
            <Link href="/products" className="btn btn-light">Shop all products</Link>
            <Link href="/about" className="btn btn-hero-outline">About us</Link>
          </div>
        </div>
        <div className="hero-emoji">💻</div>
      </section>

      <div className="perks">
        {perks.map((perk) => (
          <div className="perk" key={perk.title}>
            <span className="perk-icon">{perk.icon}</span>
            <div>
              <strong>{perk.title}</strong>
              <p>{perk.text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="home-title">Shop by category</h2>
      <div className="cat-cards">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.id).length
          return (
            <Link href={`/products?category=${c.id}`} className="cat-card" key={c.id}>
              <span className="cat-card-emoji">{c.emoji}</span>
              <strong>{c.label}</strong>
              <span>{c.text}</span>
              <span className="cat-card-count">{count} products</span>
            </Link>
          )
        })}
      </div>

      <div className="home-title-row">
        <h2 className="home-title">Featured products</h2>
        <Link href="/products" className="view-all">View all →</Link>
      </div>
      <div className="cards">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}