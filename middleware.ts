import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  const publicRoutes: string[] = ['/login', '/register'];

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/users', request.url));
  }

  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/users/:path*'],
};
