"use client";

import { CreateTodoForm } from "@/components/app/CreateTodoForm";
import { TodoList } from "@/components/app/TodoList";
import { useTodos } from "@/hooks/useTodos";
import { User } from "@/modules/domain/user";

export const Todos = ({ user }: { user: User }) => {
  const { todos, todoActionHandler, pendingTransaction } = useTodos(user.todos);

  return (
    <div className="flex cursor-pointer flex-col items-center justify-center pt-3">
      <CreateTodoForm userId={user.id} todoActionHandler={todoActionHandler} pendingTransaction={pendingTransaction} />
      <TodoList userId={user.id} todos={todos} todoActionHandler={todoActionHandler} />
    </div>
  );
};
