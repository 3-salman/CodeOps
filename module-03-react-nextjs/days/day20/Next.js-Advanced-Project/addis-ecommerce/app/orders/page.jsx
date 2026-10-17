import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { getOrdersFor } from '@/lib/db'
import { money } from '@/lib/pricing'

export const metadata = { title: 'My orders' }

export default async function OrdersPage() {
  // LAYER 2 - page check
  const session = await getSession()
  if (!session) redirect('/signin?next=/orders')

  // LAYER 4 - scoped query: only THIS user's orders. No id comes from the URL.
  const orders = await getOrdersFor(session.id)
  orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <div>
      <h1>My orders</h1>

      {orders.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">📦</div>
          <h2>No orders yet</h2>
          <p>When you place an order it will show up here.</p>
          <Link href="/products" className="btn">Browse products</Link>
        </div>
      ) : (
        orders.map((order) => (
          <Link href={`/orders/${order.id}`} className="order-row" key={order.id}>
            <div>
              <strong>{order.id}</strong>
              <p className="order-meta">
                {new Date(order.createdAt).toLocaleDateString('en-GB')} · {order.items.length} item(s)
              </p>
            </div>
            <span className={`status status-${order.status}`}>{order.status}</span>
            <strong>{money(order.total)}</strong>
          </Link>
        ))
      )}
    </div>
  )
}