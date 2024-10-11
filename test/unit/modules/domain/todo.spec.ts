import { filterTodos, toggle } from "@/modules/domain/todo";
import { TodosFilter } from "@/modules/domain/todosFilter";
import { aTodo } from "@/test/fixtures/todo.fixture";

describe("todo", () => {
  it("can be toggled", () => {
    const todo1 = aTodo({ completed: false });
    const todo2 = aTodo({ completed: true });

    expect(toggle(todo1).completed).toBeTruthy();
    expect(toggle(todo2).completed).toBeFalsy();
  });

  it("can filter todos by search term readrles off casing", () => {
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
});
