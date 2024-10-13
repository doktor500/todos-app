"use client";

import { TodoSearchCombobox } from "@/components/TodoSearchCombobox";
import { TodoSearchInput } from "@/components/TodoSearchInput";
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
