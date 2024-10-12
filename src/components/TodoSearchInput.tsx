"use client";

import { Search as SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";

import { useTodos } from "@/hooks/useTodos";
import { TodoBaseActionType } from "@/reducers/todoActionReducer";

const { SET_SEARCH_TERM } = TodoBaseActionType;

export const TodoSearchInput = ({ disabled }: { disabled: boolean }) => {
  const { dispatchAction } = useTodos();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatchAction({ type: SET_SEARCH_TERM, payload: { searchTerm: event.target.value } });
  };

  return (
    <div className="relative flex w-full rounded-e-lg border border-s-0 border-gray-300 border-s-gray-50 dark:border-gray-600 dark:border-s-gray-700 dark:bg-slate-800">
      <SearchIcon className="mx-2.5 mt-2.5 size-5" />
      <input
        type="search"
        className="block w-full rounded-e-lg py-2.5 pr-4 text-sm text-gray-900 outline-none placeholder:text-white/80 disabled:cursor-wait dark:bg-slate-800 dark:text-white"
        placeholder="Search..."
        onChange={handleInputChange}
        disabled={disabled}
      />
    </div>
  );
};
