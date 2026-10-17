import { cookies } from 'next/headers'
import { addSession, getSessionById, removeSession } from '@/lib/db'

// Sign in: save the user in data/sessions.json under a random id,
// and give the browser a cookie that holds only that id.
export async function createSession(user) {
  const id = crypto.randomUUID()
  await addSession({ id: id, userId: user.id, name: user.name, role: user.role })

  const cookieStore = await cookies()
  cookieStore.set('session', id, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })
}

// Read the cookie, find the saved session. Returns the user or null.
export async function getSession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')
  if (!cookie) return null

  const session = await getSessionById(cookie.value)
  if (!session) return null

  return { id: session.userId, name: session.name, role: session.role }
}

// Sign out: delete the saved session and the cookie.
export async function destroySession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')
  if (cookie) await removeSession(cookie.value)
  cookieStore.delete('session')
}

// After sign-in only go to pages on this site.
export function safeNext(value) {
  if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
    return value
  }
  return '/'
}