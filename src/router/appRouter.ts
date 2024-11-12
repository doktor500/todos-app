import { redirect } from "next/navigation.js";

export enum Route {
  HOME = "/",
  TODOS = "/todos",
  SIGNUP = "/signup",
  LOGIN = "/login",
  LOGOUT = "/logout",
}

const appRouter = () => {
  return {
    redirectTo: (route: Route): never => {
      return redirect(route);
    },
  };
};

export default appRouter;
