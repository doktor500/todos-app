"use client";

import { createContext, Dispatch, useReducer } from "react";

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
  getTodos: () => OptimisticTodo[];
  dispatchAction: Dispatch<TodoAction>;
};

const { SET_SEARCH_TERM, SET_TODOS_FILTER } = TodoBaseActionType;
const { CREATE_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO } = TodoOptimisticActionType;

export const TodosContext = createContext<Optional<TodosContextType>>(undefined);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const optimisticTodosContext = useOptimisticTodos();
  const initialFilerOptions = { searchTerm: undefined, todosFilter: defaultTodosFilter };
  const filteredTodos = filterTodos(optimisticTodosContext.todos).by(initialFilerOptions);
  const initialState = { todos: filteredTodos, ...initialFilerOptions };
  const [state, dispatch] = useReducer(todoActionReducer, initialState);

  const getTodos = () => filterTodos(optimisticTodosContext.todos).by(state);

  const dispatchAction: Dispatch<TodoAction> = (action: TodoAction) => {
    return match(action)
      .with({ type: CREATE_TODO }, optimisticTodosContext.dispatch)
      .with({ type: TOGGLE_TODO }, optimisticTodosContext.dispatch)
      .with({ type: EDIT_TODO }, optimisticTodosContext.dispatch)
      .with({ type: DELETE_TODO }, optimisticTodosContext.dispatch)
      .with({ type: SET_SEARCH_TERM }, dispatch)
      .with({ type: SET_TODOS_FILTER }, dispatch)
      .exhaustive();
  };

  const value: TodosContextType = {
    pendingTransaction: optimisticTodosContext.pendingTransaction,
    todosFilter: state.todosFilter,
    getTodos,
    dispatchAction,
  };

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};
