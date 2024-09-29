import { replace } from "@/modules/domain/utils/collectionUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";

export type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

export type ExistingTodo = Partial<Todo> & { id: number };

export enum TodoActionType {
  CREATE_TODO = "CREATE_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
  DELETE_TODO = "DELETE_TODO",
}

export type TodoAction =
  | { type: TodoActionType.CREATE_TODO; payload: { content: string } }
  | { type: TodoActionType.TOGGLE_TODO; payload: { todoId: number } }
  | { type: TodoActionType.DELETE_TODO; payload: { todoId: number } };

export const todoActionsReducer = (todos: Todo[], action: TodoAction): Todo[] => {
  return match(action)
    .with({ type: TodoActionType.CREATE_TODO }, ({ payload }) => addTodo(todos, payload))
    .with({ type: TodoActionType.TOGGLE_TODO }, ({ payload }) => toggleTodo(todos, payload))
    .with({ type: TodoActionType.DELETE_TODO }, ({ payload }) => deleteTodo(todos, payload))
    .exhaustive();
};

const addTodo = (todos: Todo[], { content }: { content: string }) => {
  return [{ id: 0, content, completed: false }, ...todos];
};

const toggleTodo = (todos: Todo[], { todoId }: { todoId: number }) => {
  const todo = todos.find((todo) => todo.id === todoId);

  return todo ? replace(todo).in(todos).with(toggle(todo)) : todos;
};

const deleteTodo = (todos: Todo[], { todoId }: { todoId: number }) => {
  return todos.filter((todo) => todo.id !== todoId);
};

const toggle = (todo: Todo): Todo => {
  return { ...todo, completed: !todo.completed };
};
