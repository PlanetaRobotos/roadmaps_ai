// import { auth } from "@/auth"

export { auth as middleware } from '@/auth';

// export const config = { matcher: ["/dashboard/:path*", "/protected/:path*"] } // Adjust to your protected routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
