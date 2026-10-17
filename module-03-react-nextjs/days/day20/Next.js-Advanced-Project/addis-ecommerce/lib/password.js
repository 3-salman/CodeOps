import { scryptSync, timingSafeEqual } from 'crypto'

export function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':')
  const a = Buffer.from(hash, 'hex')
  const b = scryptSync(password, salt, 64)
  return a.length === b.length && timingSafeEqual(a, b)
}


//  "passwordHash": "48a7b932f35edac0df2d127e354669b0:6bde8e5e76bbd57294379cc471aba0c4192df638e54a99ac1c160d7528e3413a5ce7e6df4049e9fd458e8aef0ce3005f8ae8f89c25b2afd70b6c84cead823863"