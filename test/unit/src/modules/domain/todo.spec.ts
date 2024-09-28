import { TodoAction, todoActionsReducer, TodoActionType } from "@/modules/domain/todo";
import { aTodo } from "@/test/fixtures/todo.fixture";

const { CREATE_TODO, TOGGLE_TODO, DELETE_TODO } = TodoActionType;

describe("todo", () => {
  it("can add a todo to an existing list of todos", () => {
    const todo = aTodo({ id: 1 });
    const todos = [todo];
    const newTodo = "New todo";

    const action: TodoAction = { type: CREATE_TODO, payload: { content: newTodo } };
    const updatedTodos = todoActionsReducer(todos, action);

    expect(updatedTodos).toContainEqual(aTodo({ id: 0, content: newTodo }));
  });

  it("can toggle a todo in an existing list of todos", () => {
    const todo = aTodo({ completed: false });
    const todos = [todo];

    const action: TodoAction = { type: TOGGLE_TODO, payload: { todoId: todo.id } };
    const updatedTodos = todoActionsReducer(todos, action);
    expect(updatedTodos).toContainEqual({ ...todo, completed: true });
  });

  it("can delete a todo in an existing list of todos", () => {
    const todo = aTodo();
    const todos = [todo];

    const action: TodoAction = { type: DELETE_TODO, payload: { todoId: todo.id } };
    const updatedTodos = todoActionsReducer(todos, action);
    expect(updatedTodos).toEqual([]);
  });
});
