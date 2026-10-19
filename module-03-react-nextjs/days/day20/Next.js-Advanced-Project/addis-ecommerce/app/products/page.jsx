import Link from 'next/link'
import { getProducts } from '@/lib/db'
import ProductGrid from '@/components/ProductGrid'

export const metadata = {
  title: 'Products',
  description: 'Browse all laptops, gaming laptops, desktops, all-in-ones and mini PCs. Search by name or brand and filter by category.',
}

// The category buttons. "id" matches the category in products.json.
const categories = [
  { id: 'all', label: 'All' },
  { id: 'laptops', label: 'Laptops' },
  { id: 'gaming', label: 'Gaming laptops' },
  { id: 'desktops', label: 'Desktops' },
  { id: 'all-in-one', label: 'All-in-one' },
  { id: 'mini-pc', label: 'Mini PCs' },
]

export default async function ProductsPage({ searchParams }) {
  // The chosen category is in the URL: /products?category=laptops
  const params = await searchParams
  const known = categories.some((c) => c.id === params.category)
  const selected = known ? params.category : 'all'

  const products = await getProducts()
  const shown = selected === 'all' ? products : products.filter((p) => p.category === selected)

  return (
    <div>
      <h1>Products</h1>

      <div className="cat-buttons">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={c.id === 'all' ? '/products' : `/products?category=${c.id}`}
            className={c.id === selected ? 'cat-btn cat-btn-active' : 'cat-btn'}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <ProductGrid initialProducts={shown} category={selected} />
    </div>
  )
}