'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSWRConfig } from 'swr'

export default function CancelOrderButton({ orderId }) {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [error, setError] = useState('')

  async function handleClick() {
    if (!confirm('Cancel this order?')) return

    const res = await fetch(`/api/orders/${orderId}/cancel`, { method: 'POST' })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }

    mutate(`/api/orders/${orderId}/status`) // refresh the live status now
    router.refresh() // reload the page so the button disappears
  }

  return (
    <div style={{ marginTop: 16 }}>
      <button className="btn btn-outline" onClick={handleClick}>Cancel order</button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}