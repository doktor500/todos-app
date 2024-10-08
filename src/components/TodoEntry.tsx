"use client";

import { Trash2 as TrashIcon } from "lucide-react";
import { FocusEvent, UIEvent } from "react";

import { deleteTodo } from "@/actions/deleteTodo";
import { editTodo } from "@/actions/editTodo";
import { toggleTodo } from "@/actions/toggleTodo";
import { Checkbox } from "@/components/ui/Checkbox";
import { useTodos } from "@/hooks/useTodos";
import { TodoId } from "@/modules/domain/todo";
import { TodoOptimisticActionType } from "@/providers/reducers/todosOptimisticsActionReducer";

type Props = {
  todoId: TodoId;
  content: string;
  completed: boolean;
};

const { TOGGLE_TODO, EDIT_TODO, DELETE_TODO } = TodoOptimisticActionType;

export const TodoEntry = (props: Props) => {
  const { todoId, content, completed } = props;
  const { userId, dispatchAction } = useTodos();

  const handleToggleTodo = async (event: UIEvent) => {
    event.preventDefault();
    dispatchAction({ type: TOGGLE_TODO, payload: { todoId } });
    await toggleTodo({ userId, todoId, completed: !completed });
  };

  const handleEditTodo = async (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatchAction({ type: EDIT_TODO, payload: { todoId, content: event.target.value } });
    await editTodo({ userId, todoId, content: event.target.value });
  };

  const handleDeleteTodo = async (event: UIEvent) => {
    event.preventDefault();
    dispatchAction({ type: DELETE_TODO, payload: { todoId } });
    await deleteTodo({ userId, todoId });
  };

  return (
    <div className="h-11 w-80 rounded-sm bg-black/20 pl-4 pt-2 hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/40 md:w-96">
      <div className="flex items-center text-gray-800 dark:text-white">
        <div className="flex h-6 w-80 items-center">
          <Checkbox checked={completed} onClick={handleToggleTodo} />
          <label className="hidden" htmlFor={`todo-${todoId}`}>
            {content}
          </label>
          <input
            id={`todo-${todoId}`}
            className="w-64 truncate bg-transparent px-2 text-sm outline-none md:w-80 md:pr-0"
            defaultValue={content}
            onBlur={(event) => handleEditTodo(event)}
          />
        </div>
        <div
          className="cursor-pointer pr-3 pt-1 text-slate-200 hover:text-white md:pl-3"
          aria-label="Delete todo"
          onClick={handleDeleteTodo}
        >
          <button className="outline-offset-2 outline-gray-300">
            <TrashIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
