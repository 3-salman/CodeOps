'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CancelOrderButton({ orderId }) {
  const router = useRouter()
  const [error, setError] = useState('')

  async function handleClick() {
    if (!confirm('Cancel this order?')) return

    const res = await fetch(`/api/orders/${orderId}/cancel`, { method: 'POST' })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }
    router.refresh() // reload the page so it shows "cancelled"
  }

  return (
    <div style={{ marginTop: 16 }}>
      <button className="btn btn-outline" onClick={handleClick}>Cancel order</button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}