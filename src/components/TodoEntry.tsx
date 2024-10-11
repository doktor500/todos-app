"use client";

import { Trash2 as TrashIcon } from "lucide-react";
import { FocusEvent, KeyboardEvent, UIEvent } from "react";

import { deleteTodo } from "@/actions/deleteTodo";
import { editTodo } from "@/actions/editTodo";
import { toggleTodo } from "@/actions/toggleTodo";
import { Checkbox } from "@/components/ui/Checkbox";
import { useInput } from "@/hooks/common/useInput";
import { useIsServer } from "@/hooks/common/useIsServer";
import { useTodos } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";
import { TodoId } from "@/modules/domain/todo";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

type Props = {
  todoId: TodoId;
  content: string;
  completed: boolean;
};

const { TOGGLE_TODO, EDIT_TODO, DELETE_TODO } = TodoOptimisticActionType;

export const TodoEntry = ({ todoId, content, completed }: Props) => {
  const isServer = useIsServer();
  const input = useInput();
  const { userId, dispatchAction } = useTodos();

  const handleToggleTodo = async (event: UIEvent) => {
    event.preventDefault();
    dispatchAction({ type: TOGGLE_TODO, payload: { todoId } });
    await toggleTodo({ userId, todoId, completed: !completed });
  };

  const handleEditTodo = async (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (content !== event.target.value) {
      dispatchAction({ type: EDIT_TODO, payload: { todoId, content: event.target.value } });
      await editTodo({ userId, todoId, content: event.target.value });
    }
  };

  const handleDeleteTodo = async (event: UIEvent) => {
    event.preventDefault();
    dispatchAction({ type: DELETE_TODO, payload: { todoId } });
    await deleteTodo({ userId, todoId });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      input.blur();
    }
  };

  return (
    <div
      className={cn(
        "h-11 w-80 rounded-sm bg-black/20 pl-4 pt-2 hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/40 md:w-96",
        { "cursor-wait": isServer }
      )}
    >
      <div className="flex items-center text-gray-800 dark:text-white">
        <div className="flex h-6 w-80 items-center">
          <Checkbox checked={completed} onClick={handleToggleTodo} disabled={isServer} />
          <label className="hidden" htmlFor={`todo-${todoId}`}>
            {content}
          </label>
          <input
            ref={input.inputRef}
            id={`todo-${todoId}`}
            className="w-64 truncate bg-transparent px-2 text-sm outline-none disabled:cursor-wait md:w-80 md:pr-0"
            defaultValue={content}
            onBlur={handleEditTodo}
            onKeyDown={handleKeyDown}
            disabled={isServer}
          />
        </div>
        <div
          className="cursor-pointer pr-3 pt-1 text-slate-200 hover:text-white md:pl-3"
          aria-label="Delete todo"
          onClick={handleDeleteTodo}
        >
          <button
            className={cn(
              "outline-offset-2 outline-gray-300 disabled:cursor-wait",
              isServer ? "opacity-50" : "opacity-100"
            )}
            disabled={isServer}
          >
            <TrashIcon size="19" />
          </button>
        </div>
      </div>
    </div>
  );
};
