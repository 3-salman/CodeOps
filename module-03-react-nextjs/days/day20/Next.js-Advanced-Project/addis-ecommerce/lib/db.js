import { promises as fs } from 'fs'
import path from 'path'

// The ONLY file that touches storage. Swap this for a real database later
// without changing any page or action. Note: Vercel's filesystem is
// read-only, so writes here will not persist on a deployment.
const dir = path.join(process.cwd(), 'data')
const read = async (name) => JSON.parse(await fs.readFile(path.join(dir, `${name}.json`), 'utf8'))
const write = (name, data) => fs.writeFile(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2))

export async function getProducts() { return read('products') }
export async function getProductBySlug(slug) { return (await read('products')).find((p) => p.slug === slug) || null }

export async function getUserByEmail(email) {
  return (await read('users')).find((u) => u.email.toLowerCase() === String(email).toLowerCase()) || null
}
export async function getUserById(id) { return (await read('users')).find((u) => u.id === id) || null }

// Scoped query: orders are ALWAYS looked up by the session's user id.
export async function getOrdersFor(userId) {
  return (await read('orders')).filter((o) => o.userId === userId)
}
export async function getOrderFor(userId, orderId) {
  return (await getOrdersFor(userId)).find((o) => o.id === orderId) || null
}
export async function saveOrders(orders) { return write('orders', orders) }

// ---- sessions: { id, userId } rows. The cookie only holds the random id.
export async function addSession(session) {
  const sessions = await read('sessions')
  sessions.push(session)
  return write('sessions', sessions)
}
export async function getSessionById(id) {
  return (await read('sessions')).find((s) => s.id === id) || null
}
export async function removeSession(id) {
  const sessions = (await read('sessions')).filter((s) => s.id !== id)
  return write('sessions', sessions)
}

// ---- more order and product helpers
export async function getAllOrders() { return read('orders') }
export async function getOrderById(id) {
  return (await read('orders')).find((o) => o.id === id) || null
}
export async function addOrder(order) {
  const orders = await read('orders')
  orders.push(order)
  return write('orders', orders)
}
export async function updateOrder(id, changes) {
  const orders = await read('orders')
  const order = orders.find((o) => o.id === id)
  if (!order) return null
  Object.assign(order, changes)
  await write('orders', orders)
  return order
}
export async function saveProducts(products) { return write('products', products) }