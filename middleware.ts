import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "bangun-ciptadana-dev-secret-change-in-production-9f8e7d6c5b4a3",
  });

  const isLoggedIn = !!token;

  if (path.startsWith("/admin")) {
    if (!isLoggedIn && path !== "/admin/login") {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(url);
    }

    if (isLoggedIn && path === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (isLoggedIn && path === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
