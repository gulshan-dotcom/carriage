import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    (pathname.startsWith("/") || pathname.startsWith("/api")) &&
    !pathname.startsWith("/login")
  ) {
    let userEmail = "";
    if (!userEmail) {
      const sessionToken = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
      });
      if (sessionToken) {
        userEmail = sessionToken.email;
      } else {
        console.log("No valid session found in NextAuth by middleware");
      }
    }

    if (!userEmail) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json(
          { success: false, message: "Unauthorized by middleWare" },
          { status: 401 },
        );
      } else if (pathname !== "/") {
        return NextResponse.redirect("/login");
      }
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-email", userEmail);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/api/:path*"],
};
