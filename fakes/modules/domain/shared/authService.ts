import appRouter, { Route } from "@/router/appRouter";

const { TODOS } = Route;

export const authCookie = {
  name: "session",
  options: { httpOnly: true, secure: true, samesite: "strict", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};

const createSession = async () => {
  appRouter.redirectTo(TODOS);
};

const verifySession = async () => {
  return { userId: 1 };
};

const authService = { createSession, verifySession };

export default authService;
