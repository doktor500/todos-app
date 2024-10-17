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

export const TodoDeleteButton = ({ todoId, disabled }: Props) => {
  const { userId, dispatchAction } = useTodos();

  const handleDeleteTodo = async (event: UIEvent) => {
    event.preventDefault();
    dispatchAction({ type: DELETE_TODO, payload: { todoId } });
    await deleteTodo({ userId, todoId });
  };

  return (
    <div className={cn("cursor-pointer text-slate-200 hover:text-white w-5 pt-1.5 pr-9", { "opacity-50": disabled })}>
      <button
        aria-label="Delete todo"
        className="outline-gray-300 disabled:cursor-wait"
        disabled={disabled}
        onClick={handleDeleteTodo}
      >
        <TrashIcon size="19" />
      </button>
    </div>
  );
};
