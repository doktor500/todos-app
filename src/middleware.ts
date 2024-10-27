import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { authCookie, decrypt } from "@/modules/domain/utils/auth";
import { LOGIN_ROUTE, TODOS_ROUTE } from "@/routes";

const protectedRoutes = [TODOS_ROUTE];

const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const cookie = (await cookies()).get(authCookie.name)?.value;
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
