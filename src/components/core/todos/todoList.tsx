"use client";

import { TodoEntry } from "@/components/core/todos/todoEntry";
import { useTodos } from "@/hooks/useTodos";

export const TodoList = () => {
  const { getTodos } = useTodos();

  return (
    <ol className="pt-6">
      {getTodos().map(({ id, content, completed, stale }) => (
        <li key={id} className="pt-1">
          <TodoEntry todoId={id} content={content} completed={completed} stale={Boolean(stale)} />
        </li>
      ))}
    </ol>
  );
};
