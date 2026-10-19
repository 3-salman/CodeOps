'use client'

import dynamic from 'next/dynamic'
import RequireAuth from '@/components/RequireAuth'

const CheckoutForm = dynamic(() => import('@/components/CheckoutForm'), {
  loading: () => <p className="login-page-status">Loading checkout…</p>,
})

export default function CheckoutScreen() {
  return (
    <RequireAuth>
      <CheckoutForm />
    </RequireAuth>
  )
}
