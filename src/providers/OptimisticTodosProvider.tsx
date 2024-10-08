"use client";

import { createContext, Dispatch, useOptimistic, useTransition } from "react";

import { Todo } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodoOptimisticAction, todoOptimisticActionsReducer } from "@/providers/reducers/todosOptimisticsActionReducer";

type OptimisticTodosContextType = {
  userId: UserId;
  todos: Todo[];
  pendingTransaction: boolean;
  dispatch: Dispatch<TodoOptimisticAction>;
};

type Props = {
  user: User;
  children: React.ReactNode;
};

export const OptimisticTodosContext = createContext<Optional<OptimisticTodosContextType>>(undefined);

export const OptimisticTodosProvider = ({ user, children }: Props) => {
  const [pendingTransaction, startTransition] = useTransition();
  const [todos, actionHandler] = useOptimistic(user.todos, todoOptimisticActionsReducer);
  const dispatch = (action: TodoOptimisticAction) => startTransition(() => actionHandler(action));
  const value = { userId: user.id, todos, pendingTransaction, dispatch };

  return <OptimisticTodosContext.Provider value={value}>{children}</OptimisticTodosContext.Provider>;
};
