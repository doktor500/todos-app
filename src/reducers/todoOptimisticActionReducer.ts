import { Todo, TodoId, toggle } from "@/modules/domain/todo";
import { replace } from "@/modules/domain/utils/collectionUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";

export enum TodoOptimisticActionType {
  CREATE_TODO = "CREATE_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
  EDIT_TODO = "EDIT_TODO",
  DELETE_TODO = "DELETE_TODO",
}

const { CREATE_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO } = TodoOptimisticActionType;

export type TodoOptimisticAction =
  | { type: TodoOptimisticActionType.CREATE_TODO; payload: { content: string } }
  | { type: TodoOptimisticActionType.TOGGLE_TODO; payload: { todoId: TodoId } }
  | { type: TodoOptimisticActionType.EDIT_TODO; payload: { todoId: TodoId; content: string } }
  | { type: TodoOptimisticActionType.DELETE_TODO; payload: { todoId: TodoId } };

export const todoOptimisticActionsReducer = (state: Todo[], action: TodoOptimisticAction): Todo[] => {
  return match(action)
    .with({ type: CREATE_TODO }, ({ payload }) => addTodo(state, payload.content))
    .with({ type: TOGGLE_TODO }, ({ payload }) => toggleTodo(state, payload.todoId))
    .with({ type: EDIT_TODO }, ({ payload }) => editTodo(state, payload.todoId, payload.content))
    .with({ type: DELETE_TODO }, ({ payload }) => deleteTodo(state, payload.todoId))
    .exhaustive();
};

const addTodo = (todos: Todo[], content: string) => {
  return [{ id: 0, content, completed: false }, ...todos];
};

const toggleTodo = (todos: Todo[], todoId: TodoId) => {
  const todo = todos.find((todo) => todo.id === todoId);

  return todo ? replace(todo).in(todos).with(toggle(todo)) : todos;
};

const editTodo = (todos: Todo[], todoId: TodoId, content: string) => {
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    const updatedTodo = { ...todo, content };

    return replace(todo).in(todos).with(updatedTodo);
  }

  return todos;
};

const deleteTodo = (todos: Todo[], todoId: TodoId) => {
  return todos.filter((todo) => todo.id !== todoId);
};