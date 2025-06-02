import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    try {
        const path = request.nextUrl.pathname;
        const isPublicPath = (path=== '/login') || (path === '/signup') || (path === '/verifyemail'); 
        const token = request.cookies.get('jwt')?.value || '';

        if(isPublicPath && token) {
            return NextResponse.redirect(new URL('/',request.nextUrl));
        }
        if(!isPublicPath && !token) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    } catch (error :any) {
        console.error("Middleware error:", error);
        return NextResponse.json({ error: error.message || "Error in the middleware" }, { status: 500 });
    }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/profile',
    '/profile/:id*',
    '/signup',
    '/verifyemail',
  ],
};