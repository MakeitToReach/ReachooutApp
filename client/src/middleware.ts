import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl
  
  // Skip middleware for API routes and static files
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/api') || 
      pathname.startsWith('/static') ||
      pathname.includes('.')) {
    return NextResponse.next()
  }

  // Check if this is a subdomain request
  const subdomain = getSubdomain(hostname)
  
  if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') {
    // Rewrite to the portfolio route with subdomain as parameter
    const url = request.nextUrl.clone()
    url.pathname = `/portfolio/${subdomain}${pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

function getSubdomain(hostname: string): string | null {
  // Handle localhost for development
  if (hostname === 'localhost') {
    return null
  }

  // Split hostname by dots
  const parts = hostname.split('.')
  
  // For localhost:3000 with subdomain (e.g., johndoe.localhost:3000)
  if (hostname.includes('localhost')) {
    if (parts.length >= 2 && parts[1] === 'localhost') {
      return parts[0]
    }
    return null
  }

  // For production domains (e.g., johndoe.reachoout.com)
  if (parts.length > 2) {
    return parts[0]
  }
  
  return null
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 