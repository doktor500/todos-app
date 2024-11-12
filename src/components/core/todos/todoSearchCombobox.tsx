"use client";

import { Combobox } from "@/components/ui/combobox";
import { useTodos } from "@/hooks/useTodos";
import { defaultTodosFilter, TodosFilter } from "@/modules/domain/todosFilter";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { TodoBaseActionType } from "@/reducers/todoActionReducer";

const { SET_TODOS_FILTER } = TodoBaseActionType;

export const TodoSearchCombobox = ({ disabled }: { disabled: boolean }) => {
  const { dispatchAction } = useTodos();

  const handleFilterChange = (selectedFilter: Optional<string>) => {
    dispatchAction({ type: SET_TODOS_FILTER, payload: { todosFilter: selectedFilter } });
  };

  return (
    <Combobox
      className="rounded-s-lg border pt-0.5 text-center text-sm font-medium text-gray-900 dark:border-gray-600 dark:text-white dark:hover:bg-slate-800"
      items={getFilters()}
      initialSelectedItem={defaultTodosFilter}
      onItemSelected={handleFilterChange}
      disabled={disabled}
    />
  );
};

const getFilters = () => {
  return [
    { value: TodosFilter.NONE, label: "All" },
    { value: TodosFilter.ACTIVE, label: "Active" },
    { value: TodosFilter.COMPLETED, label: "Done" },
  ];
};
