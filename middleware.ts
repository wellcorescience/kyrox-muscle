import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr"; // Preparing for Supabase SSR

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except login (if we had one)
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  // --- SUPABASE AUTH PLACEHOLDER ---
  // In production, use createServerClient and supabase.auth.getUser()
  // const supabase = createServerClient(...)
  // const { data: { user } } = await supabase.auth.getUser()

  // For UI development, we simulate an active session
  const hasAdminSession = true; 

  if (!hasAdminSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
