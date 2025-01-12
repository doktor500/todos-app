import { createContext, Dispatch } from "react";

import { TodosFilter } from "@/modules/domain/todosFilter";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodoBaseAction } from "@/reducers/todoActionReducer";
import { OptimisticTodo, TodoOptimisticAction } from "@/reducers/todoOptimisticActionReducer";

export type TodoAction = TodoBaseAction | TodoOptimisticAction;

export type TodosContextType = {
  pendingTransaction: boolean;
  todosFilter: TodosFilter;
  allTodos: OptimisticTodo[];
  filteredTodos: OptimisticTodo[];
  dispatchAction: Dispatch<TodoAction>;
};

export const TodosContext = createContext<Optional<TodosContextType>>(undefined);
