"use client";

import { createContext, Dispatch, ReactNode, useReducer } from "react";

import { useOptimisticTodos } from "@/hooks/useOptimisticTodos";
import { TodoAction } from "@/hooks/useTodos";
import { filterTodos } from "@/modules/domain/todo";
import { defaultTodosFilter, TodosFilter } from "@/modules/domain/todosFilter";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";
import { todoActionReducer, TodoBaseActionType } from "@/reducers/todoActionReducer";
import { OptimisticTodo, TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

type TodosContextType = {
  pendingTransaction: boolean;
  todosFilter: TodosFilter;
  allTodos: OptimisticTodo[];
  filteredTodos: OptimisticTodo[];
  dispatchAction: Dispatch<TodoAction>;
};

const { SET_SEARCH_TERM, SET_TODOS_FILTER } = TodoBaseActionType;
const { CREATE_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO, SORT_TODOS } = TodoOptimisticActionType;

export const TodosContext = createContext<Optional<TodosContextType>>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const { todos: allTodos, dispatch: dispatchOptimisticAction, pendingTransaction } = useOptimisticTodos();
  const initialState = { searchTerm: undefined, todosFilter: defaultTodosFilter };
  const [state, dispatch] = useReducer(todoActionReducer, initialState);
  const filteredTodos = filterTodos(allTodos).by(state);

  const dispatchAction: Dispatch<TodoAction> = (action: TodoAction) => {
    return match(action)
      .with({ type: CREATE_TODO }, dispatchOptimisticAction)
      .with({ type: TOGGLE_TODO }, dispatchOptimisticAction)
      .with({ type: EDIT_TODO }, dispatchOptimisticAction)
      .with({ type: DELETE_TODO }, dispatchOptimisticAction)
      .with({ type: SORT_TODOS }, dispatchOptimisticAction)
      .with({ type: SET_SEARCH_TERM }, dispatch)
      .with({ type: SET_TODOS_FILTER }, dispatch)
      .exhaustive();
  };

  const value: TodosContextType = {
    pendingTransaction,
    todosFilter: state.todosFilter,
    allTodos,
    filteredTodos,
    dispatchAction,
  };

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};
