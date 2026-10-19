'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/context/UserProvider'

// Only allow same-site paths as the post-login destination.
function safeNext(value) {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : '/menu'
}

export default function LoginScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const { setUser } = useUser()
  const [form, setForm] = useState({ username: '', pwd: '' })
  const [status, setStatus] = useState(null) // null | 'success' | 'error' | 'network'
  const [busy, setBusy] = useState(false)

  const justRegistered = params.get('registered') === '1'

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    try {
      const res = await fetch('/user.json')
      if (!res.ok) throw new Error('users')
      const seeded = await res.json()
      let registered = []
      try {
        registered = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      } catch {}
      const match = [...seeded, ...registered].find(
        (u) =>
          (u.name === form.username || u.email === form.username) && u.password === form.pwd
      )
      if (!match) {
        setStatus('error')
        return
      }
      const { password, ...safeUser } = match // never keep the password in the session
      setUser(safeUser)
      setStatus('success')
      router.push(safeNext(params.get('next')))
    } catch {
      setStatus('network')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-page-card">
        {justRegistered && status === null && (
          <p className="login-page-status login-page-status--success">✓ Account created — please sign in</p>
        )}
        {status === 'success' && (
          <p className="login-page-status login-page-status--success">✓ Logged in successfully</p>
        )}
        {status === 'error' && (
          <p className="login-page-status login-page-status--error">✕ Invalid username or password</p>
        )}
        {status === 'network' && (
          <p className="login-page-status login-page-status--error">✕ Couldn't reach the server. Try again.</p>
        )}

        <h2 className="login-page-title">Welcome Back</h2>
        <p className="login-page-subtitle">Sign in to your account</p>

        <form className="login-page-form" onSubmit={handleSubmit}>
          <div className="login-page-form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="username" value={form.username} onChange={handleChange} required />
          </div>

          <div className="login-page-form-group">
            <label htmlFor="pwd">Password</label>
            <input type="password" id="pwd" name="pwd" placeholder="••••••••" value={form.pwd} onChange={handleChange} required />
          </div>

          <button type="submit" className="login-page-button" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="login-page-signup">
          Don't have an account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
