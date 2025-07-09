import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
 const token = request.cookies.get('token')?.value || '';
 const path = request.nextUrl.pathname;
 const isPublicPath = path === '/' || path === '/auth/otp';

 if (isPublicPath && token) {
  return NextResponse.redirect(new URL('/dashboard', request.url));
 }

 if (!isPublicPath && !token) {
  return NextResponse.redirect(new URL('/', request.url));
 }

 return NextResponse.next();
}

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
