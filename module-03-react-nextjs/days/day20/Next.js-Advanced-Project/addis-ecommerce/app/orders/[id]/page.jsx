import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/session'
import { getOrderFor } from '@/lib/db'
import { money } from '@/lib/pricing'
import CancelOrderButton from '@/components/CancelOrderButton'
import OrderStatus from '@/components/OrderStatus'

export const metadata = {
  title: 'Order details',
  description: 'The items, total and live delivery status of your order.',
  robots: { index: false },
}

export default async function OrderPage({ params }) {
  const { id } = await params

  // LAYER 2 - page check
  const session = await getSession()
  if (!session) redirect(`/signin?next=/orders/${id}`)

  // LAYER 4 - scoped query: looks for this id only among THIS user's orders,
  // so changing the id in the URL to someone else's order finds nothing.
  const order = await getOrderFor(session.id, id)
  if (!order) notFound()

  const subtotal = order.items.reduce((total, item) => total + item.price * item.qty, 0)

  return (
    <div>
      <Link href="/orders" className="back-link">← Back to orders</Link>
      <h1>Order {order.id}</h1>

      <div className="section-box">
        <OrderStatus orderId={order.id} initialStatus={order.status} />
        <p className="order-meta">Placed on {new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
        {order.address && <p className="order-meta">Deliver to: {order.address} · {order.phone}</p>}

        <table className="spec-table">
          <tbody>
            {order.items.map((item) => (
              <tr key={item.productId}>
                <td>{item.name} × {item.qty}</td>
                <td>{money(item.price * item.qty)}</td>
              </tr>
            ))}
            <tr>
              <td>Delivery</td>
              <td>{money(order.total - subtotal)}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td><strong>{money(order.total)}</strong></td>
            </tr>
          </tbody>
        </table>

        {order.status === 'processing' && <CancelOrderButton orderId={order.id} />}
      </div>
    </div>
  )
}