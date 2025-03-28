import uniqueIdGenerator from "@/modules/domain/shared/uniqueIdGenerator";
import {
  TodoOptimisticAction,
  todoOptimisticActionReducer,
  TodoOptimisticActionType,
} from "@/reducers/todoOptimisticActionReducer";
import { aTodo } from "@/test/fixtures/todo.fixture";

const { CREATE_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO } = TodoOptimisticActionType;

vi.mock("@/modules/domain/shared/uniqueIdGenerator");

describe("todo optimistic actions reducer", () => {
  it("can add a todo to an existing list of todos", () => {
    const todo = aTodo({ index: 9 });
    const todos = [todo];
    const newTodo = "New todo";
    const newTodoId = uniqueIdGenerator.uuid();
    vi.mocked(uniqueIdGenerator.uuid).mockImplementationOnce(() => newTodoId);

    const action: TodoOptimisticAction = { type: CREATE_TODO, payload: { todoId: newTodoId, content: newTodo } };
    const updatedTodos = todoOptimisticActionReducer(todos, action);

    expect(updatedTodos).toContainEqual({
      id: newTodoId,
      content: newTodo,
      index: 10,
      completed: false,
      stale: true,
    });
  });

  it("can toggle a todo in an existing list of todos", () => {
    const todo = aTodo({ completed: false });
    const todos = [todo];

    const action: TodoOptimisticAction = { type: TOGGLE_TODO, payload: { todoId: todo.id } };
    const updatedTodos = todoOptimisticActionReducer(todos, action);
    expect(updatedTodos).toContainEqual({ ...todo, completed: true });
  });

  it("can edit a todo in an existing list of todos", () => {
    const todo = aTodo({ content: "content-v1" });
    const todos = [todo];

    const action: TodoOptimisticAction = { type: EDIT_TODO, payload: { todoId: todo.id, content: "content-v2" } };
    const updatedTodos = todoOptimisticActionReducer(todos, action);
    expect(updatedTodos).toContainEqual({ ...todo, content: "content-v2" });
  });

  it("can delete a todo in an existing list of todos", () => {
    const todo = aTodo();
    const todos = [todo];

    const action: TodoOptimisticAction = { type: DELETE_TODO, payload: { todoId: todo.id } };
    const updatedTodos = todoOptimisticActionReducer(todos, action);
    expect(updatedTodos).toEqual([]);
  });
});
