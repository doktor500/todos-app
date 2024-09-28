import { useOptimistic, useTransition } from "react";

import { Todo, TodoAction, todoActionsReducer } from "@/modules/domain/todo";

export type TodoActionHandler = { handle: (action: TodoAction) => void };

export const useTodos = (initialTodos: Todo[]) => {
  const [pendingTransaction, startTransition] = useTransition();
  const [todos, actionHandler] = useOptimistic(initialTodos, todoActionsReducer);
  const todoActionHandler = {
    handle: (action: TodoAction) => startTransition(() => actionHandler(action)),
  };

  return { pendingTransaction, todos, todoActionHandler };
};
