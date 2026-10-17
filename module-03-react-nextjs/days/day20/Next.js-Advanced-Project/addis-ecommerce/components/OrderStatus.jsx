'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

// Shows the order status and checks for a new one every 5 seconds.
// "initialStatus" came from the server, so there is no spinner on arrival.
export default function OrderStatus({ orderId, initialStatus }) {
  const { data } = useSWR(`/api/orders/${orderId}/status`, fetcher, {
    fallbackData: { status: initialStatus },
    revalidateOnMount: false,
    // Poll every 5 seconds, but stop once the order is finished.
    refreshInterval: (latest) =>
      latest && (latest.status === 'delivered' || latest.status === 'cancelled') ? 0 : 5000,
  })

  const status = data.status

  return (
    <p>
      Status: <span className={`status status-${status}`}>{status}</span>
      {status !== 'delivered' && status !== 'cancelled' && (
        <span className="live-note"> · updates automatically</span>
      )}
    </p>
  )
}