import { redirect } from "next/navigation";

import { LOGIN_ROUTE, TODOS_ROUTE } from "@/routes";

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
