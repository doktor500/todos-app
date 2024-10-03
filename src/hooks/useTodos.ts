import { useContext, useEffect, useReducer } from "react";

import { filterTodos, TodosFilter } from "@/modules/domain/todo";
import { TodoBaseActionType, todosActionReducer } from "@/providers/reducers/todosActionReducer";
import { TodosContext } from "@/providers/TodosProvider";

const { UPDATE_TODOS } = TodoBaseActionType;

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("userTodos must be used within a CountProvider");

  const { todos } = context;
  const initialState = { todos, searchTerm: undefined, todosFilter: TodosFilter.NONE };
  const [state, dispatchAction] = useReducer(todosActionReducer, initialState);
  const { searchTerm, todosFilter } = state;

  useEffect(() => {
    const updatedTodos = filterTodos(todos).by({ searchTerm, todosFilter });
    dispatchAction({ type: UPDATE_TODOS, payload: { todos: updatedTodos } });
  }, [todos, searchTerm, todosFilter]);

  return {
    ...context,
    todos: state.todos,
    dispatchAction,
  };
};
