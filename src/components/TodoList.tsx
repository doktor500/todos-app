"use client";

import { TodoEntry } from "@/components/TodoEntry";
import { useTodos } from "@/hooks/useTodos";

export const TodoList = () => {
  const { getTodos } = useTodos();

  return (
    <div className="no-scrollbar max-h-[432px] overflow-y-auto pb-1 md:max-h-[484px]">
      <ul>
        {getTodos().map(({ id, content, completed, stale }) => (
          <li key={id} className="pt-1">
            <TodoEntry todoId={id} content={content} completed={completed} stale={Boolean(stale)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
