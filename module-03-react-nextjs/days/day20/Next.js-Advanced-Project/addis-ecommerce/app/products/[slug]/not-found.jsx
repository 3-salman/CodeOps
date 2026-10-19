import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <div>
      <h1>Product not found</h1>
      <p>This product does not exist or was removed.</p>
      <Link href="/products" className="btn">Back to products</Link>
    </div>
  )
}