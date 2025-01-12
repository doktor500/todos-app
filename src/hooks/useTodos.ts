import { useContext } from "react";

import { TodosContext } from "@/providers/context/todosContext";

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodosContext must be used within a TodosProvider");

  return context;
};
