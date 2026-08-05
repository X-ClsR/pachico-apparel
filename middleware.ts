import { NextRequest, NextResponse } from "next/server";

// Rute API yang cuma boleh diakses admin yang udah login.
// Endpoint publik (checkout bikin order baru, tracking, dll) TIDAK termasuk di sini.
const PROTECTED_API_PREFIXES = [
  "/api/products",
  "/api/upload",
  "/api/admin/orders",
];

function isProtectedApi(pathname: string) {
  if (pathname.startsWith("/api/orders/")) return true; // PATCH update status/resi
  return PROTECTED_API_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  const { pathname } = req.nextUrl;

  // Proteksi halaman dashboard admin
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Proteksi API yang cuma boleh dipakai admin
  if (isProtectedApi(pathname)) {
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/products/:path*", "/api/upload/:path*", "/api/orders/:path*", "/api/admin/orders/:path*"],
};