import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  // Protected routes (require authentication)
  if (
    !session &&
    ["/dashboard", "/dashboard/group"].some((route) =>
      pathname.startsWith(route)
    )
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent logged-in users from accessing /login and /register
  if (session && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
