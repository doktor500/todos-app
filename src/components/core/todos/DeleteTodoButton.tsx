"use client";

import { Trash2Icon as TrashIcon } from "lucide-react";
import { UIEvent } from "react";

import { deleteTodo } from "@/actions/todos/deleteTodo";
import { useTodos } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";
import { TodoId } from "@/modules/domain/todo";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

const { DELETE_TODO } = TodoOptimisticActionType;

type Props = {
  todoId: TodoId;
  disabled: boolean;
};

export const DeleteTodoButton = ({ todoId, disabled }: Props) => {
  const { dispatchAction } = useTodos();

  const handleDeleteTodo = async (event: UIEvent) => {
    event.preventDefault();
    dispatchAction({ type: DELETE_TODO, payload: { todoId } });
    await deleteTodo({ todoId });
  };

  return (
    <div className={cn("text-slate-200 hover:text-white pr-3.5", { "opacity-50": disabled })}>
      <button
        id={`delete-todo${todoId}`}
        aria-label="Delete todo"
        className="flex w-8 cursor-pointer items-center justify-center outline-gray-300 disabled:cursor-wait"
        disabled={disabled}
        onClick={handleDeleteTodo}
      >
        <TrashIcon size="19" />
      </button>
    </div>
  );
};
