import { getUser } from "@/actions/user/getUser";
import { Todos } from "@/components/core/todos/todos";
import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodosApplicationProvider } from "@/providers/todosApplicationProvider";
import appRouter, { Route } from "@/router/appRouter";

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
