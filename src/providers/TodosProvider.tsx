"use client";

import { createContext, Dispatch, useReducer } from "react";

import { useOptimisticTodos } from "@/hooks/useOptimisticTodos";
import { TodoAction } from "@/hooks/useTodos";
import { defaultTodosFilter, filterTodos, Todo } from "@/modules/domain/todo";
import { UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";
import { TodoBaseActionType, todosActionReducer } from "@/providers/reducers/todosActionReducer";
import { TodoOptimisticActionType } from "@/providers/reducers/todosOptimisticActionReducer";

type TodosContextType = {
  userId: UserId;
  pendingTransaction: boolean;
  getTodos: () => Todo[];
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
  const [state, dispatch] = useReducer(todosActionReducer, initialState);

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

  const value = {
    userId: optimisticTodosContext.userId,
    pendingTransaction: optimisticTodosContext.pendingTransaction,
    getTodos,
    dispatchAction,
  };

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};
