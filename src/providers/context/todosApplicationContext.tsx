import { createContext, Dispatch } from "react";

import { Todo } from "@/modules/domain/todo";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodoOptimisticAction } from "@/reducers/todoOptimisticActionReducer";

export type TodosApplicationContextType = {
  todos: Todo[];
  pendingTransaction: boolean;
  dispatch: Dispatch<TodoOptimisticAction>;
};

export const TodosApplicationContext = createContext<Optional<TodosApplicationContextType>>(undefined);
