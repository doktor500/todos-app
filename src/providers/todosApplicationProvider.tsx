"use client";

import { ReactNode, useOptimistic, useTransition } from "react";

import { Todo } from "@/modules/domain/todo";
import { TodosApplicationContext, TodosApplicationContextType } from "@/providers/context/todosApplicationContext";
import { TodosProvider } from "@/providers/todosProvider";
import { TodoOptimisticAction, todoOptimisticActionReducer } from "@/reducers/todoOptimisticActionReducer";

type Props = {
  todos: Todo[];
  children: ReactNode;
};

export const TodosApplicationProvider = ({ todos: userTodos, children }: Props) => {
  const [pendingTransaction, startTransition] = useTransition();
  const [todos, actionHandler] = useOptimistic(userTodos, todoOptimisticActionReducer);
  const dispatch = (action: TodoOptimisticAction) => startTransition(() => actionHandler(action));
  const value: TodosApplicationContextType = { todos, pendingTransaction, dispatch };

  return (
    <TodosApplicationContext.Provider value={value}>
      <TodosProvider>{children}</TodosProvider>
    </TodosApplicationContext.Provider>
  );
};
