import { NextRequest, NextResponse } from "next/server";

import { authCookie } from "@/modules/domain/shared/authService";
import { decrypt } from "@/modules/domain/utils/encryptionUtils";
import { Route } from "@/router/appRouter";

const { LOGIN, TODOS } = Route;

const protectedRoutes: string[] = [TODOS];

const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const redirect = await handleProtectedRoute(request);
    if (redirect) return redirect;
  }

  return NextResponse.next();
};

const handleProtectedRoute = async (request: NextRequest) => {
  const cookie = request.cookies.get(authCookie.name)?.value;
  if (cookie) {
    const session = await decrypt(cookie);
    if (!session?.userId) return NextResponse.redirect(new URL(LOGIN, request.nextUrl));
  } else return NextResponse.redirect(new URL(LOGIN, request.nextUrl));
};

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    },
  ],
};

export default middleware;
