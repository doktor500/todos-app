"use client";

import { useIsServer } from "@/hooks/common/useIsServer";
import { cn } from "@/lib/utils";
import { TodoSearchCombobox } from "@/react-components/core/todos/todoSearchCombobox";
import { TodoSearchInput } from "@/react-components/core/todos/todoSearchInput";

export const TodosSearchBar = () => {
  const isServer = useIsServer();

  return (
    <div className={cn("flex pb-1.5", { "cursor-wait": isServer })}>
      <TodoSearchCombobox disabled={isServer} />
      <TodoSearchInput disabled={isServer} />
    </div>
  );
};
