import { useContext } from "react";

import { TodoBaseAction } from "@/providers/reducers/todosActionReducer";
import { TodoOptimisticAction } from "@/providers/reducers/todosOptimisticsActionReducer";
import { TodosContext } from "@/providers/TodosProvider";

export type TodoAction = TodoBaseAction | TodoOptimisticAction;

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodosContext must be used within a TodosProvider");

  return context;
};
