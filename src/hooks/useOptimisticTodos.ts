import { useContext } from "react";

import { TodosApplicationContext } from "@/providers/context/todosApplicationContext";

export const useOptimisticTodos = () => {
  const context = useContext(TodosApplicationContext);
  if (!context) throw new Error("useOptimisticTodos must be used within a TodosProvider");

  return context;
};
