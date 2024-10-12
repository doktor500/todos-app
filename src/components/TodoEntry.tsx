"use client";

import { TodoCheckBox } from "@/components/TodoCheckBox";
import { TodoDeleteButton } from "@/components/TodoDeleteButton";
import { TodoInput } from "@/components/TodoInput";
import { useIsServer } from "@/hooks/common/useIsServer";
import { cn } from "@/lib/utils";
import { TodoId } from "@/modules/domain/todo";

type Props = {
  todoId: TodoId;
  content: string;
  completed: boolean;
  stale: boolean;
};

export const TodoEntry = ({ todoId, content, completed, stale }: Props) => {
  const isServer = useIsServer();
  const disabled = isServer || stale;

  return (
    <div
      className={cn(
        "h-11 rounded-sm bg-black/20 pl-4 pt-2.5 hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/40",
        { "cursor-wait": disabled }
      )}
    >
      <div className="flex items-center text-gray-800 dark:text-white">
        <div className="flex h-6 items-center">
          <TodoCheckBox todoId={todoId} completed={completed} disabled={disabled} />
          <TodoInput todoId={todoId} content={content} disabled={disabled} />
          <TodoDeleteButton todoId={todoId} disabled={disabled} />
        </div>
      </div>
    </div>
  );
};
