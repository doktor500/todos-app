"use client";

import { Dispatch, ReactNode, useReducer } from "react";

import { useOptimisticTodos } from "@/hooks/useOptimisticTodos";
import { filterTodos } from "@/modules/domain/todo";
import { defaultTodosFilter } from "@/modules/domain/todosFilter";
import { match } from "@/modules/domain/utils/patternMatchingUtils";
import { TodoAction, TodosContext, TodosContextType } from "@/providers/context/todosContext";
import { todoActionReducer, TodoBaseActionType } from "@/reducers/todoActionReducer";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

const { SET_SEARCH_TERM, SET_TODOS_FILTER } = TodoBaseActionType;
const { CREATE_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO, SORT_TODOS } = TodoOptimisticActionType;

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
