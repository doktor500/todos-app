import {
  TodoOptimisticAction,
  todoOptimisticActionsReducer,
  TodoOptimisticActionType,
} from "@/providers/reducers/todosOptimisticsActionReducer";
import { aTodo } from "@/test/fixtures/todo.fixture";

const { CREATE_TODO, TOGGLE_TODO, DELETE_TODO } = TodoOptimisticActionType;

describe("todos optimistic actions reducer", () => {
  it("can add a todo to an existing list of todos", () => {
    const todo = aTodo({ id: 1 });
    const todos = [todo];
    const newTodo = "New todo";

    const action: TodoOptimisticAction = { type: CREATE_TODO, payload: { content: newTodo } };
    const updatedTodos = todoOptimisticActionsReducer(todos, action);

    expect(updatedTodos).toContainEqual(aTodo({ id: 0, content: newTodo }));
  });

  it("can toggle a todo in an existing list of todos", () => {
    const todo = aTodo({ completed: false });
    const todos = [todo];

    const action: TodoOptimisticAction = { type: TOGGLE_TODO, payload: { todoId: todo.id } };
    const updatedTodos = todoOptimisticActionsReducer(todos, action);
    expect(updatedTodos).toContainEqual({ ...todo, completed: true });
  });

  it("can delete a todo in an existing list of todos", () => {
    const todo = aTodo();
    const todos = [todo];

    const action: TodoOptimisticAction = { type: DELETE_TODO, payload: { todoId: todo.id } };
    const updatedTodos = todoOptimisticActionsReducer(todos, action);
    expect(updatedTodos).toEqual([]);
  });
});
