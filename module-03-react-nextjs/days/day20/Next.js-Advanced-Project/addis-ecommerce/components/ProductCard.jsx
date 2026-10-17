import Link from 'next/link'
import CardAddButton from './CardAddButton'

// One product card. Used on the home page and on /products.
export default function ProductCard({ product }) {
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`}>
        <div className="card-emoji">{product.emoji}</div>
        <p className="card-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="card-price">{product.price.toLocaleString('en-US')} ETB</p>
      </Link>
      <CardAddButton product={product} />
    </div>
  )
}