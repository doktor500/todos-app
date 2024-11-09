import appRouter from "@/router/appRouter";

const Page = () => {
  appRouter().redirectTo("/todos");
};

export default Page;
