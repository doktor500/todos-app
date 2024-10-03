import { findTodoFilter, Todo, TodosFilter } from "@/modules/domain/todo";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";

export enum TodoBaseActionType {
  SET_SEARCH_TERM = "SET_SEARCH_TERM",
  SET_TODOS_FILTER = "SET_TODOS_FILTER",
  UPDATE_TODOS = "UPDATE_TODOS",
}

export type TodoBaseAction =
  | { type: TodoBaseActionType.SET_SEARCH_TERM; payload: { searchTerm: string } }
  | { type: TodoBaseActionType.SET_TODOS_FILTER; payload: { todosFilter: Optional<string> } }
  | { type: TodoBaseActionType.UPDATE_TODOS; payload: { todos: Todo[] } };

export type DispatchTodoAction = (action: TodoBaseAction) => void;

type TodosState = {
  todos: Todo[];
  searchTerm: Optional<string>;
  todosFilter: TodosFilter;
};

const { SET_SEARCH_TERM, SET_TODOS_FILTER, UPDATE_TODOS } = TodoBaseActionType;

const handleSetTodosFilter = (state: TodosState, todosFilter: Optional<string>): TodosState => {
  const filter = findTodoFilter(todosFilter);

  return filter ? { ...state, todosFilter: filter } : state;
};

export const todosActionReducer = (state: TodosState, action: TodoBaseAction): TodosState => {
  return match(action)
    .with({ type: SET_SEARCH_TERM }, ({ payload }) => ({ ...state, searchTerm: payload.searchTerm }))
    .with({ type: SET_TODOS_FILTER }, ({ payload }) => handleSetTodosFilter(state, payload.todosFilter))
    .with({ type: UPDATE_TODOS }, ({ payload }) => ({ ...state, todos: payload.todos }))
    .exhaustive();
};
