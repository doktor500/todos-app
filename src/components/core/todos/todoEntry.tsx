"use client";

import { GripVertical } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { DeleteTodoButton } from "@/components/core/todos/deleteTodoButton";
import { TodoCheckBox } from "@/components/core/todos/todoCheckBox";
import { TodoInput } from "@/components/core/todos/todoInput";
import { useIsServer } from "@/hooks/common/useIsServer";
import { cn } from "@/lib/utils";
import { TodoId } from "@/modules/domain/todo";

type Props = {
  todoId: TodoId;
  content: string;
  completed: boolean;
  stale: boolean;
  allowDrag: boolean;
  isGrabbed: boolean;
  setIsGrabbed: Dispatch<SetStateAction<boolean>>;
};

export const TodoEntry = ({ todoId, content, completed, stale, allowDrag, isGrabbed, setIsGrabbed }: Props) => {
  const isServer = useIsServer();
  const disabled = isServer || stale;

  return (
    <div
      className={cn(
        "flex cursor-default items-center h-11 overflow-x-hidden dark:text-white rounded-sm pl-3 dark:bg-slate-700/60 dark:hover:bg-slate-800",
        { "cursor-wait": disabled, "animate-pulse": stale }
      )}
    >
      <GripVertical
        aria-label={`Drag todo ${content}`}
        className={cn("size-5", { "cursor-grabbing": allowDrag && isGrabbed, "cursor-grab": allowDrag && !isGrabbed })}
        onMouseDown={() => setIsGrabbed(true)}
        onMouseUp={() => setIsGrabbed(false)}
      />
      <TodoCheckBox todoId={todoId} completed={completed} disabled={disabled} />
      <TodoInput todoId={todoId} content={content} disabled={disabled} />
      <DeleteTodoButton todoId={todoId} disabled={disabled} />
    </div>
  );
};
