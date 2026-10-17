'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInForm({ next }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }
    router.push(next) // "next" was already checked on the server
    router.refresh() // re-render the header with the signed-in name
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Sign in</h1>

      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      {error && <p className="error">{error}</p>}

      <button className="btn" type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
      <p className="hint">Demo: abel@shop.test / demo1234 · admin@shop.test / admin1234</p>
    </form>
  )
}
