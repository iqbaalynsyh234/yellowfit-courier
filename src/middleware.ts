import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
 const token = request.cookies.get('token')?.value || '';
 const path = request.nextUrl.pathname;

 // Public paths that don't require authentication
 const isPublicPath = path === '/' || path === '/auth/otp';

 if (isPublicPath && token) {
  // If user is logged in and tries to access public paths, redirect to dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url));
 }

 if (!isPublicPath && !token) {
  // If user is not logged in and tries to access protected paths, redirect to login
  return NextResponse.redirect(new URL('/', request.url));
 }

 return NextResponse.next();
}

// Configure the paths that should be handled by this middleware
export const config = {
 matcher: [
  '/',
  '/dashboard',
  '/pickup/:path*',
  '/history/:path*',
  '/profile/:path*',
  '/auth/:path*',
 ],
};
