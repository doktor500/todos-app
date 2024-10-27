import { redirect } from "next/navigation";

import { TODOS_ROUTE } from "@/routes";

export const createSession = async () => {
  redirect(TODOS_ROUTE);
};

export const verifySession = async () => {
  return { userId: 1 };
};

export const decrypt = async () => {
  return { userId: 1 };
};
