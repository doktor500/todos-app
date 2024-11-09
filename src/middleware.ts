import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

import { authCookie } from "@/modules/domain/shared/authService";
import cookieManager from "@/modules/domain/shared/cookieManager";
import { decrypt } from "@/modules/domain/utils/encryptionUtils";
import { Route } from "@/router/appRouter";

const { LOGIN, TODOS } = Route;

const protectedRoutes: string[] = [TODOS];

const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const redirect = await handleProtectedRoute(request.nextUrl);
    if (redirect) return redirect;
  }

  return NextResponse.next();
};

const handleProtectedRoute = async (url: NextURL) => {
  const cookie = await cookieManager().getCookie(authCookie.name);
  if (cookie) {
    const session = await decrypt(cookie);
    if (!session?.userId) return NextResponse.redirect(new URL(LOGIN, url));
  } else return NextResponse.redirect(new URL(LOGIN, url));
};

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    },
  ],
};

export default middleware;
