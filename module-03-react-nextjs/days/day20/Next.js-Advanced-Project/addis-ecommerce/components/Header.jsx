import Link from 'next/link'
import { getSession } from '@/lib/session'
import SignOutButton from './SignOutButton'
import CartLink from './CartLink'

export default async function Header() {
  const session = await getSession()

  return (
    <header className="header">
      <div className="container header-row">
        <Link href="/" className="brand">Addis-Ecommerce</Link>

        <nav className="nav">
          <Link href="/products">Products</Link>
          <Link href="/about">About us</Link>
          {session && <Link href="/orders">Orders</Link>}
        </nav>

        <div className="account">
          <CartLink />
          {session ? (
            <>
              <span>{session.name}</span>
              <SignOutButton />
            </>
          ) : (
            <Link href="/signin" className="btn">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  )
}