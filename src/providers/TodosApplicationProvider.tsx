"use client";

import { createContext, Dispatch, useOptimistic, useTransition } from "react";

import { Todo } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodosProvider } from "@/providers/TodosProvider";
import { TodoOptimisticAction, todoOptimisticActionsReducer } from "@/reducers/todoOptimisticActionReducer";

type TodosApplicationContextType = {
  userId: UserId;
  todos: Todo[];
  pendingTransaction: boolean;
  dispatch: Dispatch<TodoOptimisticAction>;
};

type Props = {
  user: User;
  children: React.ReactNode;
};

export const TodosApplicationContext = createContext<Optional<TodosApplicationContextType>>(undefined);

export const TodosApplicationProvider = ({ user, children }: Props) => {
  const [pendingTransaction, startTransition] = useTransition();
  const [todos, actionHandler] = useOptimistic(user.todos, todoOptimisticActionsReducer);
  const dispatch = (action: TodoOptimisticAction) => startTransition(() => actionHandler(action));
  const value = { userId: user.id, todos, pendingTransaction, dispatch };

  return (
    <TodosApplicationContext.Provider value={value}>
      <TodosProvider>{children}</TodosProvider>
    </TodosApplicationContext.Provider>
  );
};
