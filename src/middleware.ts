import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const path = req.nextUrl.pathname;

  const isAuthPage = path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/admin/login');
  const isAdminRoute = path.startsWith('/admin') && !path.startsWith('/admin/login');
  
  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(role === 'ADMIN' ? '/admin' : '/', req.nextUrl));
    }
    return NextResponse.next();
  }

  // Protect Admin Routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.nextUrl));
    }
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  return NextResponse.next();
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
