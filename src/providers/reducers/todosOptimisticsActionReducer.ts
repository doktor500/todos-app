import { Todo, toggle } from "@/modules/domain/todo";
import { replace } from "@/modules/domain/utils/collectionUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";

export enum TodoOptimisticActionType {
  CREATE_TODO = "CREATE_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
  DELETE_TODO = "DELETE_TODO",
}

const { CREATE_TODO, TOGGLE_TODO, DELETE_TODO } = TodoOptimisticActionType;

export type TodoOptimisticAction =
  | { type: TodoOptimisticActionType.CREATE_TODO; payload: { content: string } }
  | { type: TodoOptimisticActionType.TOGGLE_TODO; payload: { todoId: number } }
  | { type: TodoOptimisticActionType.DELETE_TODO; payload: { todoId: number } };

export const todoOptimisticActionsReducer = (state: Todo[], action: TodoOptimisticAction): Todo[] => {
  return match(action)
    .with({ type: CREATE_TODO }, ({ payload }) => addTodo(state, payload.content))
    .with({ type: TOGGLE_TODO }, ({ payload }) => toggleTodo(state, payload.todoId))
    .with({ type: DELETE_TODO }, ({ payload }) => deleteTodo(state, payload.todoId))
    .exhaustive();
};

const addTodo = (todos: Todo[], content: string) => {
  return [{ id: 0, content, completed: false }, ...todos];
};

const toggleTodo = (todos: Todo[], todoId: number) => {
  const todo = todos.find((todo) => todo.id === todoId);

  return todo ? replace(todo).in(todos).with(toggle(todo)) : todos;
};

const deleteTodo = (todos: Todo[], todoId: number) => {
  return todos.filter((todo) => todo.id !== todoId);
};
