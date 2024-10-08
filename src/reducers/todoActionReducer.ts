import { findTodoFilter, Todo, TodosFilter } from "@/modules/domain/todo";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";

export enum TodoBaseActionType {
  SET_SEARCH_TERM = "SET_SEARCH_TERM",
  SET_TODOS_FILTER = "SET_TODOS_FILTER",
}

export type TodoBaseAction =
  | { type: TodoBaseActionType.SET_SEARCH_TERM; payload: { searchTerm: string } }
  | { type: TodoBaseActionType.SET_TODOS_FILTER; payload: { todosFilter: Optional<string> } };

export type DispatchTodoAction = (action: TodoBaseAction) => void;

type TodosState = {
  todos: Todo[];
  searchTerm: Optional<string>;
  todosFilter: TodosFilter;
};

const { SET_SEARCH_TERM, SET_TODOS_FILTER } = TodoBaseActionType;

const handleSetTodosFilter = (state: TodosState, todosFilter: Optional<string>): TodosState => {
  const filter = findTodoFilter(todosFilter);

  return filter ? { ...state, todosFilter: filter } : state;
};

export const todoActionReducer = (state: TodosState, action: TodoBaseAction): TodosState => {
  return match(action)
    .with({ type: SET_SEARCH_TERM }, ({ payload }) => ({ ...state, searchTerm: payload.searchTerm }))
    .with({ type: SET_TODOS_FILTER }, ({ payload }) => handleSetTodosFilter(state, payload.todosFilter))
    .exhaustive();
};
