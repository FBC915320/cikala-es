import { NextResponse, type NextRequest } from "next/server";
import { getPagePath, defaultLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(getPagePath(defaultLocale, "home"), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/"
};
