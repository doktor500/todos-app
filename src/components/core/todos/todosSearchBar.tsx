"use client";

import { TodoSearchCombobox } from "@/components/core/todos/todoSearchCombobox";
import { TodoSearchInput } from "@/components/core/todos/todoSearchInput";
import { useIsServer } from "@/hooks/common/useIsServer";
import { cn } from "@/lib/utils";

export const TodosSearchBar = () => {
  const isServer = useIsServer();

  return (
    <div className={cn("flex pb-1.5", { "cursor-wait": isServer })}>
      <TodoSearchCombobox disabled={isServer} />
      <TodoSearchInput disabled={isServer} />
    </div>
  );
};
