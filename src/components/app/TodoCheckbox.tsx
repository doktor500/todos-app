"use client";

import { toggleTodo } from "@/actions/toggleTodo";
import { Checkbox } from "@/components/ui/Checkbox";

type Props = {
  userId: number;
  todoId: number;
  content: string;
  completed: boolean;
};

export const TodoCheckbox = ({ userId, todoId, content, completed }: Props) => {
  return (
    <div className="h-11 w-96 rounded-sm bg-black/20 pl-4 pt-3 hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/40">
      <div className="flex items-center text-gray-800 dark:text-white">
        <Checkbox
          id={`todo-${todoId}`}
          checked={completed}
          onClick={() => toggleTodo({ userId, todoId, completed: !completed })}
        />
        <label htmlFor={`todo-${todoId}`} className="pl-2 text-sm">
          {content}
        </label>
      </div>
    </div>
  );
};
