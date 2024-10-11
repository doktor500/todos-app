import { TodoAction } from "@/hooks/useTodos";
import { TodosFilter } from "@/modules/domain/todosFilter";
import { todoActionReducer, TodoBaseActionType } from "@/reducers/todoActionReducer";
import { aTodo } from "@/test/fixtures/todo.fixture";

const { SET_SEARCH_TERM, SET_TODOS_FILTER } = TodoBaseActionType;

describe("todos actions reducer", () => {
  it("can update the search term", () => {
    const todos = [aTodo()];
    const initialState = { todos, searchTerm: undefined, todosFilter: TodosFilter.NONE };
    const searchTerm = "Milk";
    const action: TodoAction = { type: SET_SEARCH_TERM, payload: { searchTerm } };
    const updatedState = todoActionReducer(initialState, action);

    expect(updatedState).toEqual({ todos, searchTerm, todosFilter: TodosFilter.NONE });
  });

  it("can update the todos filter", () => {
    const todos = [aTodo()];
    const initialState = { todos, searchTerm: undefined, todosFilter: TodosFilter.NONE };
    const action: TodoAction = { type: SET_TODOS_FILTER, payload: { todosFilter: TodosFilter.ACTIVE } };
    const updatedState = todoActionReducer(initialState, action);

    expect(updatedState).toEqual({ todos, searchTerm: undefined, todosFilter: TodosFilter.ACTIVE });
  });
});
