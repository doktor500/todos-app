import { redirect } from "next/navigation";

export enum Route {
  TODOS = "/todos",
  SIGNUP = "/signup",
  LOGIN = "/login",
}

const applicationRouter = {
  redirectTo: (route: Route): never => redirect(route),
};

export default applicationRouter;
