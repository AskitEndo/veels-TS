import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow path related to AUTH
        if (
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register")
        ) {
          return true;
        }

        // Allow path related to PUBLIC
        if (pathname.startsWith("/api/videos") || pathname === "/") {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const congfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/.*)"],
};
