import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/db'

// GET /api/products?search=macbook&category=laptops
// Public, like the products page.
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const search = (searchParams.get('search') || '').trim().toLowerCase()
  const category = searchParams.get('category') || 'all'

  let products = await getProducts()

  if (category !== 'all') {
    products = products.filter((p) => p.category === category)
  }

  if (search) {
    products = products.filter((p) =>
      (p.name + ' ' + p.brand + ' ' + p.description).toLowerCase().includes(search)
    )
  }

  return NextResponse.json(products)
}