import { Dispatch, useReducer } from "react";

import { defaultTodosFilter, filterTodos } from "@/modules/domain/todo";
import { match } from "@/modules/domain/utils/patternMatchingUtils";
import { TodoBaseAction, TodoBaseActionType, todosActionReducer } from "@/providers/reducers/todosActionReducer";
import { TodoOptimisticAction, TodoOptimisticActionType } from "@/providers/reducers/todosOptimisticsActionReducer";
import { useTodosContext } from "@/providers/TodosProvider";

export type TodoAction = TodoBaseAction | TodoOptimisticAction;

const { SET_SEARCH_TERM, SET_TODOS_FILTER } = TodoBaseActionType;
const { CREATE_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO } = TodoOptimisticActionType;

export const useTodos = () => {
  const context = useTodosContext();
  const initialFilerOptions = { searchTerm: undefined, todosFilter: defaultTodosFilter };
  const filteredTodos = filterTodos(context.todos).by(initialFilerOptions);
  const initialState = { todos: filteredTodos, ...initialFilerOptions };
  const [state, dispatch] = useReducer(todosActionReducer, initialState);

  const getTodos = () => filterTodos(context.todos).by(state);

  const dispatchAction: Dispatch<TodoAction> = (action: TodoAction) => {
    return match(action)
      .with({ type: CREATE_TODO }, context.dispatch)
      .with({ type: TOGGLE_TODO }, context.dispatch)
      .with({ type: EDIT_TODO }, context.dispatch)
      .with({ type: DELETE_TODO }, context.dispatch)
      .with({ type: SET_SEARCH_TERM }, dispatch)
      .with({ type: SET_TODOS_FILTER }, dispatch)
      .exhaustive();
  };

  return {
    userId: context.userId,
    pendingTransaction: context.pendingTransaction,
    getTodos,
    dispatchAction,
  };
};
