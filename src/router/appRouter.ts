import { redirect as nextRedirect } from "next/navigation.js";

export enum Route {
  HOME = "/",
  TODOS = "/todos",
  SIGNUP = "/signup",
  LOGIN = "/login",
}

export type RedirectFn = (route: string) => never;

const appRouter = (redirect = nextRedirect) => {
  return {
    redirectTo: (route: string): never => {
      return redirect(route);
    },
  };
};

export default appRouter;
