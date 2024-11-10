"use client";

import { createContext, Dispatch, useOptimistic, useTransition } from "react";

import { Todo } from "@/modules/domain/todo";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodosProvider } from "@/providers/todosProvider";
import { TodoOptimisticAction, todoOptimisticActionReducer } from "@/reducers/todoOptimisticActionReducer";

type TodosApplicationContextType = {
  todos: Todo[];
  pendingTransaction: boolean;
  dispatch: Dispatch<TodoOptimisticAction>;
};

type Props = {
  todos: Todo[];
  children: React.ReactNode;
};

export const TodosApplicationContext = createContext<Optional<TodosApplicationContextType>>(undefined);

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
