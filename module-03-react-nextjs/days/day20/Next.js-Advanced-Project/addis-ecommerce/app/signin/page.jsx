import { redirect } from 'next/navigation'
import { getSession, safeNext } from '@/lib/session'
import SignInForm from '@/components/SignInForm'

export const metadata = {
  title: 'Sign in',
  description: 'Sign in to your Addis-Ecommerce account to check out and see your orders.',
  robots: { index: false },
}

export default async function SignInPage({ searchParams }) {
  const { next } = await searchParams
  const target = safeNext(next)
  if (await getSession()) redirect(target)
  return <SignInForm next={target} />
}