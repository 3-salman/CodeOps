import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/db'


// The tab title and description for this product.
export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product not found' }
  return { title: product.name, description: product.description }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = {
    "id": "p26",
    "slug": "mac-mini-m2",
    "name": "Mac mini M2",
    "category": "mini-pc",
    "emoji": "🗄️",
    "price": 85000,
    "stock": 4,
    "description": "Tiny desktop with Apple silicon speed.",
    "image": null,
    "brand": "Apple",
    "specs": [
      {
        "label": "Processor",
        "value": "Apple M2"
      },
      {
        "label": "Memory",
        "value": "8 GB unified"
      },
      {
        "label": "Storage",
        "value": "256 GB SSD"
      },
      {
        "label": "Display",
        "value": "Monitor sold separately"
      },
      {
        "label": "Ports",
        "value": "2 Thunderbolt, 2 USB-A, HDMI"
      }
    ],
    "highlights": [
      "Very small",
      "Fast M2 chip",
      "Silent"
    ],
    "warranty": "1 year"
  }
  // await getProductBySlug(slug)

  // No product with this slug -> show the 404 page.
  if (!product) notFound()

  return (
    <div>
      <Link href="/products" className="back-link">← Back to products</Link>

      <div className="detail">
        <div className="detail-image">{product.emoji}</div>

        <div className="detail-info">
          <p className="card-category">{product.category} · {product.brand}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{product.price.toLocaleString('en-US')} ETB</p>
          <p>{product.description}</p>

          <ul className="highlights">
            {product.highlights.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>

          {product.stock > 0 ? (
            <p className="in-stock">In stock ({product.stock} left)</p>
          ) : (
            <p className="error">Out of stock</p>
          )}

          {/* <AddToCart product={product} /> */}
        </div>
      </div>

      <div className="section-box">
        <h2>Specifications</h2>
        <table className="spec-table">
          <tbody>
            <tr>
              <td>Brand</td>
              <td>{product.brand}</td>
            </tr>
            {product.specs.map((spec) => (
              <tr key={spec.label}>
                <td>{spec.label}</td>
                <td>{spec.value}</td>
              </tr>
            ))}
            <tr>
              <td>Warranty</td>
              <td>{product.warranty}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section-box">
        <h2>Delivery and returns</h2>
        <ul className="info-list">
          <li>Delivery across Addis Ababa in 1–2 days</li>
          <li>Pay on delivery or by mobile money</li>
          <li>7-day return if the item is faulty</li>
          <li>{product.warranty} warranty on every product</li>
        </ul>
      </div>
    </div>
  )
}