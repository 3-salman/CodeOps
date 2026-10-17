import CartView from '@/components/CartView'

export const metadata = { title: 'Your cart' }

export default function CartPage() {
  return (
    <div>
      <h1>Your cart</h1>
      <CartView />
    </div>
  )
}