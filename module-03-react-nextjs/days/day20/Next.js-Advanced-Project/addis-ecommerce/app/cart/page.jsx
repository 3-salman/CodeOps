import CartView from '@/components/CartView'

export const metadata = {
  title: 'Your cart',
  description: 'The products in your Addis-Ecommerce cart.',
  robots: { index: false },
}

export default function CartPage() {
  return (
    <div>
      <h1>Your cart</h1>
      <CartView />
    </div>
  )
}