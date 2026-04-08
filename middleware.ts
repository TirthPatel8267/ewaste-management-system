import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  if (
    path === "/login" ||
    path === "/register" ||
    path.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user: any = jwtDecode(token); // ✅ decode only (no verify)

    console.log("USER:", user);

    return NextResponse.next();
  } catch (err) {
    console.log("INVALID TOKEN");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/collector/:path*", "/dashboard/:path*"],
};