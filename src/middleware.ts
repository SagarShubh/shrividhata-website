import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that require authentication
    const isProtectedPath = path.startsWith('/admin') && !path.startsWith('/admin/login');

    // Get the token from the cookies
    const token = request.cookies.get('admin_session')?.value;

    // If trying to access protected path without token, redirect to login
    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If trying to access login page WITH token, redirect to dashboard
    if (path === '/admin/login' && token) {
        return NextResponse.redirect(new URL('/admin/products', request.url));
    }

    return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
