import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { getOrderFor } from '@/lib/db'

// GET /api/orders/ord_811/status   (polled by the order page every few seconds)
export async function GET(request, { params }) {
  const { id } = await params

  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Please sign in.' }, { status: 401 })
  }

  // Scoped query: only finds the order if it belongs to the signed-in user.
  const order = await getOrderFor(session.id, id)
  if (!order) {
    return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
  }

  return NextResponse.json({ status: order.status })
}