import { redirect as nextRedirect } from "next/navigation.js";

export enum Route {
  HOME = "/",
  TODOS = "/todos",
  SIGNUP = "/signup",
  LOGIN = "/login",
}

const appRouter = (redirect = nextRedirect) => {
  return {
    redirectTo: (route: Route): never => {
      return redirect(route);
    },
  };
};

export default appRouter;
