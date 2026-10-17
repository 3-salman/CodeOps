import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import CheckoutForm from '@/components/CheckoutForm'

export const metadata = { title: 'Checkout' }

export default async function CheckoutPage() {
  // LAYER 2 - the page checks the session is real, not just that a cookie exists.
  const session = await getSession()
  if (!session) redirect('/signin?next=/checkout')

  return (
    <div>
      <h1>Checkout</h1>
      <CheckoutForm name={session.name} />
    </div>
  )
}