import { NextResponse } from 'next/server'

// LAYER 1 - runs before the page.
// It only checks that a "session" cookie EXISTS. It cannot tell if the cookie is
// real - the page and the API routes check that (layers 2 and 3).
export function middleware(request) {
  const cookie = request.cookies.get('session')

  if (!cookie) {
    const url = new URL('/signin', request.url)
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Only these routes go through the middleware.
export const config = {
  matcher: ['/checkout', '/orders/:path*', '/admin/:path*'],
}