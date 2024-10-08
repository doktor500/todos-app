"use client";

import { createContext, Dispatch, useContext, useOptimistic, useTransition } from "react";

import { Todo } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodoOptimisticAction, todoOptimisticActionsReducer } from "@/providers/reducers/todosOptimisticsActionReducer";

type TodosContextType = {
  userId: UserId;
  todos: Todo[];
  pendingTransaction: boolean;
  dispatch: Dispatch<TodoOptimisticAction>;
};

type Props = {
  user: User;
  children: React.ReactNode;
};

const TodosContext = createContext<Optional<TodosContextType>>(undefined);

export const TodosProvider = ({ user, children }: Props) => {
  const [pendingTransaction, startTransition] = useTransition();
  const [todos, actionHandler] = useOptimistic(user.todos, todoOptimisticActionsReducer);
  const dispatch = (action: TodoOptimisticAction) => startTransition(() => actionHandler(action));
  const context = { userId: user.id, todos, pendingTransaction, dispatch };

  return <TodosContext.Provider value={context}>{children}</TodosContext.Provider>;
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodosContext must be used within a TodosProvider");

  return context;
};
