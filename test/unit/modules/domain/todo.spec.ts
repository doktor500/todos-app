import { filterTodos, getNextTodoIndex, Todo, toggle } from "@/modules/domain/todo";
import { TodosFilter } from "@/modules/domain/todosFilter";
import { aTodo } from "@/test/fixtures/todo.fixture";

describe("todo", () => {
  it("can be toggled", () => {
    const todo1 = aTodo({ completed: false });
    const todo2 = aTodo({ completed: true });

    expect(toggle(todo1).completed).toBeTruthy();
    expect(toggle(todo2).completed).toBeFalsy();
  });

  it("can filter todos by search term regardless off casing", () => {
    const todo1 = aTodo({ content: "Buy milk" });
    const todo2 = aTodo({ content: "Buy coffee" });
    const todos = [todo1, todo2];

    expect(filterTodos(todos).by({ searchTerm: "Buy", todosFilter: TodosFilter.NONE })).toEqual(todos);
    expect(filterTodos(todos).by({ searchTerm: "buy", todosFilter: TodosFilter.NONE })).toEqual(todos);
    expect(filterTodos(todos).by({ searchTerm: "milk", todosFilter: TodosFilter.NONE })).toEqual([todo1]);
    expect(filterTodos(todos).by({ searchTerm: "coffee", todosFilter: TodosFilter.NONE })).toEqual([todo2]);
  });

  it("can filter todos by search term and todos state", () => {
    const todo1 = aTodo({ content: "Buy milk", completed: true });
    const todo2 = aTodo({ content: "Buy coffee", completed: false });
    const todos = [todo1, todo2];

    expect(filterTodos(todos).by({ searchTerm: "Buy", todosFilter: TodosFilter.NONE })).toEqual(todos);
    expect(filterTodos(todos).by({ searchTerm: "Buy", todosFilter: TodosFilter.COMPLETED })).toEqual([todo1]);
    expect(filterTodos(todos).by({ searchTerm: "Buy", todosFilter: TodosFilter.ACTIVE })).toEqual([todo2]);
  });

  it.each`
    highestTodoIndex | nextTodoIndex
    ${1}             | ${2}
    ${2}             | ${3}
  `("gets next todo index", ({ highestTodoIndex, nextTodoIndex }) => {
    const todos = [aTodo({ index: 0 }), aTodo({ index: highestTodoIndex })];
    expect(getNextTodoIndex(todos)).toBe(nextTodoIndex);
  });

  it("returns 0 as next index when the user has no todos", () => {
    const todos: Todo[] = [];
    expect(getNextTodoIndex(todos)).toBe(0);
  });
});
