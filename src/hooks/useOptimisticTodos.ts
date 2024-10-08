import { useContext } from "react";

import { OptimisticTodosContext } from "@/providers/OptimisticTodosProvider";

export const useOptimisticTodos = () => {
  const context = useContext(OptimisticTodosContext);
  if (!context) throw new Error("useOptimisticTodos must be used within a TodosProvider");

  return context;
};
