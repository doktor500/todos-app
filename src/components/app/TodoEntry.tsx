"use client";

import { Trash2 as TrashIcon } from "lucide-react";
import { UIEvent } from "react";

import { deleteTodo } from "@/actions/deleteTodo";
import { toggleTodo } from "@/actions/toggleTodo";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  TodoAction,
  TodoActionHandler,
  TodoActionType,
} from "@/hooks/useTodos";

type Props = {
  userId: number;
  todoId: number;
  content: string;
  completed: boolean;
  todoActionHandler: TodoActionHandler;
};

const { TOGGLE_TODO, DELETE_TODO } = TodoActionType;

export const TodoEntry = (props: Props) => {
  const { userId, todoId, content, completed, todoActionHandler } = props;

  const handleToggleTodo = async (event: UIEvent) => {
    const action: TodoAction = { type: TOGGLE_TODO, payload: { todoId } };
    event.preventDefault();
    todoActionHandler.handle(action);
    await toggleTodo({ userId, todoId, completed: !completed });
  };

  const handleDeleteTodo = async (event: UIEvent) => {
    const action: TodoAction = { type: DELETE_TODO, payload: { todoId } };
    event.preventDefault();
    todoActionHandler.handle(action);
    await deleteTodo({ userId, todoId });
  };

  return (
    <div className="h-11 w-96 rounded-sm bg-black/20 pl-4 pt-3 hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/40">
      <div className="flex items-center text-gray-800 dark:text-white">
        <div className="flex w-80 items-center" onClick={handleToggleTodo}>
          <Checkbox id={`todo-${todoId}`} checked={completed} />
          <label
            htmlFor={`todo-${todoId}`}
            className="truncate pl-2 text-sm"
            aria-label="Todo description"
          >
            {content}
          </label>
        </div>
        <div
          className="ml-auto pr-4"
          aria-label="Delete todo"
          onClick={handleDeleteTodo}
        >
          <TrashIcon size="20" />
        </div>
      </div>
    </div>
  );
};
