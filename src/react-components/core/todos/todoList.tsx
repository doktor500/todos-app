"use client";

import { useTodos } from "@/hooks/useTodos";
import { TodoEntry } from "@/react-components/core/todos/todoEntry";

export const TodoList = () => {
  const { getTodos } = useTodos();

  return (
    <ol>
      {getTodos().map(({ id, content, completed, stale }) => (
        <li key={id} className="pt-1">
          <TodoEntry todoId={id} content={content} completed={completed} stale={Boolean(stale)} />
        </li>
      ))}
    </ol>
  );
};
