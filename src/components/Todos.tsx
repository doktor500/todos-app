"use client";

import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodoList } from "@/components/TodoList";
import { Spinner } from "@/components/ui/Spinner";
import { useTodos } from "@/hooks/useTodos";
import { User } from "@/modules/domain/user";

export const Todos = ({ user }: { user: User }) => {
  const { todos, todoActionHandler, pendingTransaction } = useTodos(user.todos);

  return (
    <div>
      <div className="flex h-8 items-center justify-center">{pendingTransaction && <Spinner />}</div>
      <div className="flex cursor-pointer flex-col items-center justify-center pt-3">
        <CreateTodoForm
          userId={user.id}
          todoActionHandler={todoActionHandler}
          pendingTransaction={pendingTransaction}
        />
        <TodoList userId={user.id} todos={todos} todoActionHandler={todoActionHandler} />
      </div>
    </div>
  );
};
