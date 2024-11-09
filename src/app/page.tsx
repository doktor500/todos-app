import appRouter, { Route } from "@/router/appRouter";

const { TODOS } = Route;

const Page = () => {
  appRouter().redirectTo(TODOS);
};

export default Page;
