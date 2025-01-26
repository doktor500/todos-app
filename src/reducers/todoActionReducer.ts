import { findTodoFilter, TodosFilter } from "@/modules/domain/todosFilter";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";

export const TodoBaseActionType = {
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_TODOS_FILTER: "SET_TODOS_FILTER",
} as const;

export type TodoBaseActionType = (typeof TodoBaseActionType)[keyof typeof TodoBaseActionType];

const { SET_SEARCH_TERM, SET_TODOS_FILTER } = TodoBaseActionType;

export type TodoBaseAction =
  | { type: "SET_SEARCH_TERM"; payload: { searchTerm: string } }
  | { type: "SET_TODOS_FILTER"; payload: { todosFilter: Optional<string> } };

type TodosState = {
  searchTerm: Optional<string>;
  todosFilter: TodosFilter;
};

const handleSetSearchTerm = (state: TodosState, searchTerm: string): TodosState => {
  return { ...state, searchTerm };
};

const handleSetTodosFilter = (state: TodosState, todosFilter: Optional<string>): TodosState => {
  const filter = findTodoFilter(todosFilter);

  return filter ? { ...state, todosFilter: filter } : state;
};

export const todoActionReducer = (state: TodosState, action: TodoBaseAction): TodosState => {
  return match(action)
    .with({ type: SET_SEARCH_TERM }, ({ payload }) => handleSetSearchTerm(state, payload.searchTerm))
    .with({ type: SET_TODOS_FILTER }, ({ payload }) => handleSetTodosFilter(state, payload.todosFilter))
    .exhaustive();
};
