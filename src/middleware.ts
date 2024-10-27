import { NextRequest, NextResponse } from "next/server";

import { decrypt } from "@/authentication";
import { authCookie } from "@/cookies/authCookie";
import cookieManager from "@/modules/domain/shared/cookieManager";
import { LOGIN_ROUTE, TODOS_ROUTE } from "@/routes";

const protectedRoutes = [TODOS_ROUTE];

const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const cookie = await cookieManager.getCookie(authCookie.name);
    const session = await decrypt(cookie ?? "");
    if (!session?.userId) return NextResponse.redirect(new URL(LOGIN_ROUTE, request.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    },
  ],
};

export default middleware;
