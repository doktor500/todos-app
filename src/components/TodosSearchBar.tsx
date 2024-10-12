"use client";

import { Search as SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";

import { Combobox } from "@/components/ui/Combobox";
import { useIsServer } from "@/hooks/common/useIsServer";
import { useTodos } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";
import { defaultTodosFilter, TodosFilter } from "@/modules/domain/todosFilter";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodoBaseActionType } from "@/reducers/todoActionReducer";

const { SET_SEARCH_TERM, SET_TODOS_FILTER } = TodoBaseActionType;

export const TodosSearchBar = () => {
  const isServer = useIsServer();
  const { dispatchAction } = useTodos();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatchAction({ type: SET_SEARCH_TERM, payload: { searchTerm: event.target.value } });
  };

  const handleFilterChange = (selectedFilter: Optional<string>) => {
    dispatchAction({ type: SET_TODOS_FILTER, payload: { todosFilter: selectedFilter } });
  };

  return (
    <div className={cn("flex pb-4 pt-6", { "cursor-wait": isServer })}>
      <div className="w-[130px] rounded-s-lg border bg-slate-900 pt-0.5 text-center text-sm font-medium text-gray-900 hover:bg-slate-800 dark:border-gray-600 dark:text-white">
        <Combobox
          items={getFilters()}
          initialSelectedItem={defaultTodosFilter}
          onItemSelected={handleFilterChange}
          disabled={isServer}
        />
      </div>
      <div className="relative flex w-full rounded-e-lg border border-s-0 border-gray-300 border-s-gray-50 dark:border-gray-600 dark:border-s-gray-700 dark:bg-slate-800">
        <SearchIcon className="mx-2.5 mt-2.5 size-5" />
        <input
          type="search"
          className="block w-full rounded-e-lg py-2.5 pr-4 text-sm text-gray-900 outline-none disabled:cursor-wait dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
          placeholder="Search..."
          onChange={handleInputChange}
          disabled={isServer}
        />
      </div>
    </div>
  );
};

const getFilters = () => {
  return [
    { value: TodosFilter.NONE, label: "All" },
    { value: TodosFilter.ACTIVE, label: "Active" },
    { value: TodosFilter.COMPLETED, label: "Done" },
  ];
};
