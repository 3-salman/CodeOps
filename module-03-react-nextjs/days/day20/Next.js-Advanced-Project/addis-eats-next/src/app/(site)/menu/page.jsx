import { Suspense } from 'react'
import MenuScreen from '@/screens/MenuScreen'

export const metadata = { title: 'Menu' }

export default function MenuPage() {
  return (
    <Suspense fallback={<p className="login-page-status">Loading menu…</p>}>
      <MenuScreen />
    </Suspense>
  )
}
