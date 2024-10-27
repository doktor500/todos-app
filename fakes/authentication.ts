import { redirect } from "next/navigation";

import { LOGIN_ROUTE, TODOS_ROUTE } from "@/routes";

export const authCookie = {
  name: "session",
  options: { httpOnly: true, secure: true, samesite: "strict", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};

export const createSession = async () => {
  redirect(TODOS_ROUTE);
};

export const verifySession = async () => {
  return { userId: 1 };
};

export const deleteSession = async () => {
  redirect(LOGIN_ROUTE);
};

export const decrypt = async () => {
  return { userId: 1 };
};
