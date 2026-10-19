import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getProducts, saveProducts, addOrder } from '@/lib/db'
import { DELIVERY_FEE } from '@/lib/pricing'

// POST /api/orders   { items: [{ productId, qty }], phone, address }
export async function POST(request) {
  // LAYER 3 - the action checks the session itself.
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Please sign in.' }, { status: 401 })
  }

  const body = await request.json()
  const phone = String(body.phone || '').trim()
  const address = String(body.address || '').trim()

  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
    return NextResponse.json({ error: 'Enter a valid phone number.' }, { status: 400 })
  }
  if (address.length < 5) {
    return NextResponse.json({ error: 'Enter your delivery address.' }, { status: 400 })
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 })
  }

  // Names and prices come from OUR data, never from the browser.
  const products = await getProducts()
  const items = []

  for (const line of body.items) {
    const product = products.find((p) => p.id === line.productId)
    const qty = Number(line.qty)

    if (!product || !Number.isInteger(qty) || qty < 1) {
      return NextResponse.json({ error: 'Invalid item in your cart.' }, { status: 400 })
    }
    if (qty > product.stock) {
      return NextResponse.json({ error: `Only ${product.stock} of ${product.name} left.` }, { status: 409 })
    }
    items.push({ productId: product.id, name: product.name, price: product.price, qty: qty })
  }

  // Take the items out of stock.
  for (const item of items) {
    products.find((p) => p.id === item.productId).stock -= item.qty
  }
  await saveProducts(products)

  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0)
  const order = {
    id: 'ord_' + crypto.randomUUID().slice(0, 8),
    userId: session.id, // the owner is the SESSION user, never an id from the browser
    items: items,
    total: subtotal + DELIVERY_FEE,
    status: 'processing',
    phone: phone,
    address: address,
    createdAt: new Date().toISOString(),
  }
  await addOrder(order)

  return NextResponse.json({ id: order.id })
}