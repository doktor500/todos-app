"use client";

import { createContext, useOptimistic, useTransition } from "react";

import { Todo } from "@/modules/domain/todo";
import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodoOptimisticAction, todoOptimisticActionsReducer } from "@/providers/reducers/todosOptimisticsActionReducer";

type TodosContextType = {
  userId: number;
  todos: Todo[];
  pendingTransaction: boolean;
  dispatchOptimisticAction: (action: TodoOptimisticAction) => void;
};

type Props = {
  user: User;
  children: React.ReactNode;
};

export const TodosContext = createContext<Optional<TodosContextType>>(undefined);

export const TodosProvider = ({ user, children }: Props) => {
  const [pendingTransaction, startTransition] = useTransition();
  const [todos, actionHandler] = useOptimistic(user.todos, todoOptimisticActionsReducer);
  const dispatchOptimisticAction = (action: TodoOptimisticAction) => startTransition(() => actionHandler(action));
  const context = { userId: user.id, todos, pendingTransaction, dispatchOptimisticAction };

  return <TodosContext.Provider value={context}>{children}</TodosContext.Provider>;
};
