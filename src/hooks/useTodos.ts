import { useContext } from "react";

import { TodosContext } from "@/providers/todosProvider";
import { TodoBaseAction } from "@/reducers/todoActionReducer";
import { TodoOptimisticAction } from "@/reducers/todoOptimisticActionReducer";

export type TodoAction = TodoBaseAction | TodoOptimisticAction;

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodosContext must be used within a TodosProvider");

  return context;
};
