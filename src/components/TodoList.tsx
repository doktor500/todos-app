"use client";

import { TodoEntry } from "@/components/TodoEntry";
import { useTodos } from "@/hooks/useTodos";

export const TodoList = () => {
  const { getTodos } = useTodos();

  return (
    <div className="no-scrollbar overflow-y-auto pb-1">
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
