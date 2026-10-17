import { NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/db'
import { verifyPassword } from '@/lib/password'
import { createSession } from '@/lib/session'

// POST /api/signin  { email, password }
export async function POST(request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 })
  }

  const user = await getUserByEmail(email)
  // Same message for a wrong email and a wrong password.
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  await createSession({ id: user.id, role: user.role, name: user.name })
  return NextResponse.json({ ok: true })
}
