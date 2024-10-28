import { redirect } from "next/navigation";

export enum Route {
  HOME = "/",
  TODOS = "/todos",
  SIGNUP = "/signup",
  LOGIN = "/login",
}

const appRouter = {
  redirectTo: (route: Route): never => redirect(route),
};

export default appRouter;
