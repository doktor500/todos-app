import { Viewport } from "next";

import { getUser } from "@/actions/user/getUser";
import { Todos } from "@/components/core/todos/todos";
import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodosApplicationProvider } from "@/providers/todosApplicationProvider";
import appRouter from "@/router/appRouter";

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

const Page = async () => {
  const user = await getUser().then(redirectWhenNotFound);

  return (
    <TodosApplicationProvider todos={user.todos}>
      <Todos />
    </TodosApplicationProvider>
  );
};

const redirectWhenNotFound = (user: Optional<User>) => {
  return user ? user : appRouter().redirectTo("/login");
};

export default Page;
