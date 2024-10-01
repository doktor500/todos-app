"use client";

import { Trash2 as TrashIcon } from "lucide-react";
import { FocusEvent, UIEvent } from "react";

import { deleteTodo } from "@/actions/deleteTodo";
import { editTodo } from "@/actions/editTodo";
import { toggleTodo } from "@/actions/toggleTodo";
import { Checkbox } from "@/components/ui/Checkbox";
import { TodoActionHandler } from "@/hooks/useTodos";
import { TodoAction, TodoActionType } from "@/modules/domain/todo";

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

  const handleEditTodo = async (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    await editTodo({ userId, todoId, content: event.target.value });
  };

  return (
    <div className="h-11 w-80 rounded-sm bg-black/20 pl-4 pt-3 hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/40 md:w-96">
      <div className="flex items-center text-gray-800 dark:text-white">
        <div className="flex w-80 items-center">
          <Checkbox checked={completed} onClick={handleToggleTodo} />
          <label className="hidden" htmlFor={`todo-${todoId}`}>
            {content}
          </label>
          <input
            id={`todo-${todoId}`}
            className="w-64 truncate bg-transparent pl-2 text-sm outline-none md:w-80"
            defaultValue={content}
            onBlur={(event) => handleEditTodo(event)}
          />
        </div>
        <div className="ml-auto pr-4" aria-label="Delete todo" onClick={handleDeleteTodo}>
          <TrashIcon size="20" />
        </div>
      </div>
    </div>
  );
};
