import { findTodoFilter, TodosFilter } from "@/modules/domain/todosFilter";

describe("todo s filter", () => {
  it("can be found by value", () => {
    expect(findTodoFilter("NONE")).toEqual(TodosFilter.NONE);
    expect(findTodoFilter("ACTIVE")).toEqual(TodosFilter.ACTIVE);
    expect(findTodoFilter("COMPLETED")).toEqual(TodosFilter.COMPLETED);
    expect(findTodoFilter("INVALID")).toBeUndefined();
  });
});
