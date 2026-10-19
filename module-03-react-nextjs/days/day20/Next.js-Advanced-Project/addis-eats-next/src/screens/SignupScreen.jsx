'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Field from '@/components/Field'
import { validateSignup } from '@/lib/validate'

export default function SignupScreen() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [touched, setTouched] = useState({})
  const [formError, setFormError] = useState('')

  const errors = validateSignup(form)
  const err = (n) => (touched[n] ? errors[n] : undefined)

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }
  function handleBlur(e) {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, password: true })
    if (Object.keys(errors).length > 0) return

    // Demo only: there is no backend, so accounts live in this browser's
    // localStorage (password in plain text). Never do this in production.
    let list = []
    try {
      list = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    } catch {}
    if (list.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) {
      setFormError('An account with this email already exists.')
      return
    }
    list.push({ ...form, address: '' })
    localStorage.setItem('registeredUsers', JSON.stringify(list))
    router.push('/login?registered=1')
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-page-card">
        <h2 className="login-page-title">Create Account</h2>
        <p className="login-page-subtitle">Join Addis Eats and start ordering</p>

        {formError && <p className="login-page-status login-page-status--error">✕ {formError}</p>}

        <form className="login-page-form" onSubmit={handleSubmit} noValidate>
          <Field label="Full Name" id="name" placeholder="Sara Bekele" value={form.name} onChange={handleChange} onBlur={handleBlur} error={err('name')} />
          <Field label="Email Address" id="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} onBlur={handleBlur} error={err('email')} />
          <Field label="Phone Number" id="phone" type="tel" placeholder="+251 9********" value={form.phone} onChange={handleChange} onBlur={handleBlur} error={err('phone')} />
          <Field label="Password" id="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} onBlur={handleBlur} error={err('password')} />
          <button type="submit" className="login-page-button">Create Account</button>
        </form>

        <p className="login-page-signup">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
