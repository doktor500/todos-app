import { now } from "@/modules/domain/utils/clock";
import { uuid } from "@/modules/domain/utils/uniqueIdGenerator";
import {
  TodoOptimisticAction,
  todoOptimisticActionReducer,
  TodoOptimisticActionType,
} from "@/reducers/todoOptimisticActionReducer";
import { aTodo } from "@/test/fixtures/todo.fixture";

const { CREATE_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO } = TodoOptimisticActionType;

vi.mock("@/modules/domain/utils/uniqueIdGenerator");
vi.mock("@/modules/domain/utils/clock");

describe("todo optimistic actions reducer", () => {
  it("can add a todo to an existing list of todos", () => {
    const todo = aTodo({ id: uuid() });
    const todos = [todo];
    const newTodo = "New todo";
    const newTodoId = uuid();
    const currentDate = new Date();
    vi.mocked(uuid).mockImplementationOnce(() => newTodoId);
    vi.mocked(now).mockImplementationOnce(() => currentDate);

    const action: TodoOptimisticAction = { type: CREATE_TODO, payload: { content: newTodo } };
    const updatedTodos = todoOptimisticActionReducer(todos, action);

    expect(updatedTodos).toContainEqual({
      id: newTodoId,
      content: newTodo,
      createdAt: currentDate,
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