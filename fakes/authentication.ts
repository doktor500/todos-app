import appRouter, { Route } from "@/router/appRouter";

const { TODOS } = Route;

export const createSession = async () => {
  appRouter.redirectTo(TODOS);
};

export const verifySession = async () => {
  return { userId: 1 };
};
