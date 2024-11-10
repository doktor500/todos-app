import { Viewport } from "next";

import { getUser } from "@/actions/user/getUser";
import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { Todos } from "@/react-components/core/todos/todos";
import { TodosApplicationProvider } from "@/react-providers/todosApplicationProvider";
import appRouter, { Route } from "@/router/appRouter";

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

const { LOGIN } = Route;

const Page = async () => {
  const user = await getUser().then(redirectWhenNotFound);

  return (
    <TodosApplicationProvider todos={user.todos}>
      <Todos />
    </TodosApplicationProvider>
  );
};

const redirectWhenNotFound = (user: Optional<User>) => {
  return user ? user : appRouter().redirectTo(LOGIN);
};

export default Page;
