"use client";

import { Combobox } from "@/components/ui/Combobox";
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
    <div className="rounded-s-lg border bg-slate-900 pt-0.5 text-center text-sm font-medium text-gray-900 hover:bg-slate-800 dark:border-gray-600 dark:text-white">
      <Combobox
        items={getFilters()}
        initialSelectedItem={defaultTodosFilter}
        onItemSelected={handleFilterChange}
        disabled={disabled}
      />
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