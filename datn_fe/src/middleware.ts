import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {  // Check for token in cookies first, then in localStorage via request headers
  const token = request.cookies.get('authToken')?.value || request.headers.get('x-auth-token');
  
  // Check if the path is protected (requires authentication)
  const isProtectedPath = 
    request.nextUrl.pathname.startsWith('/account') || 
    request.nextUrl.pathname.startsWith('/api/protected');
  
  // Check if path is for trainer only
  const isTrainerPath = request.nextUrl.pathname.startsWith('/account/trainer');
    // If user is not authenticated and tries to access protected routes, redirect to login
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is already authenticated and tries to access login page, redirect to dashboard
  // We can't determine exact role, so we'll redirect to the default dashboard
  if (request.nextUrl.pathname === '/login' && token) {
    console.log('User already logged in, redirecting from login page');
    const dashboardUrl = new URL('/account/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  // Note: Role-based routing (trainer vs regular user) is handled in the account layout component
  // because middleware doesn't have access to decoded JWT claims without custom setup
  
  // Continue with the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication API routes)
     * - _next (Next.js system paths)
     * - _vercel (Vercel system paths)
     * - public files like favicon.ico, images
     */
    '/((?!api/auth|_next|_vercel|.*\\..*|favicon.ico).*)',
  ],
};
