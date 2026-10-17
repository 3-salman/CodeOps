'use client'

import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  async function handleClick() {
    await fetch('/api/signout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  return <button className="btn btn-outline" onClick={handleClick}>Sign out</button>
}
