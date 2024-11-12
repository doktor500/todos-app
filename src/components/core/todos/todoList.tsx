"use client";

import { TodoEntry } from "@/components/core/todos/todoEntry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTodos } from "@/hooks/useTodos";

export const TodoList = () => {
  const { getTodos } = useTodos();

  return (
    <ScrollArea className="mt-6 h-[calc(100vh-292px)] rounded-md">
      <ol>
        {getTodos().map(({ id, content, completed, stale }) => (
          <li key={id} className="[&:not(:first-child)]:pt-1">
            <TodoEntry todoId={id} content={content} completed={completed} stale={Boolean(stale)} />
          </li>
        ))}
      </ol>
    </ScrollArea>
  );
};
