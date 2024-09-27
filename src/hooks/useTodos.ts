import { useOptimistic, useTransition } from "react";

import { Todo, toggle } from "@/modules/domain/todo";
import { replace } from "@/modules/domain/utils/collectionUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";

export enum TodoActionType {
  CREATE_TODO = "CREATE_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
  DELETE_TODO = "DELETE_TODO",
}

export type TodoAction =
  | { type: TodoActionType.CREATE_TODO; payload: { content: string } }
  | { type: TodoActionType.TOGGLE_TODO; payload: { todoId: number } }
  | { type: TodoActionType.DELETE_TODO; payload: { todoId: number } };

export type TodoActionHandler = { handle: (action: TodoAction) => void };

const { CREATE_TODO, TOGGLE_TODO, DELETE_TODO } = TodoActionType;

export const useTodos = (initialTodos: Todo[]) => {
  const [pendingTransaction, startTransition] = useTransition();
  const [todos, actionHandler] = useOptimistic(initialTodos, todosReducer);
  const todoActionHandler = {
    handle: (action: TodoAction) => {
      startTransition(() => actionHandler(action));
    },
  };

  return { pendingTransaction, todos, todoActionHandler };
};

const todosReducer = (todos: Todo[], action: TodoAction): Todo[] => {
  return match(action)
    .with({ type: CREATE_TODO }, ({ payload }) => addTodo(todos, payload))
    .with({ type: TOGGLE_TODO }, ({ payload }) => toggleTodo(todos, payload))
    .with({ type: DELETE_TODO }, ({ payload }) => deleteTodo(todos, payload))
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
