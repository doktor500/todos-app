import { Optional } from "@/modules/domain/utils/optionalUtils";

export enum TodosFilter {
  NONE = "NONE",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export const defaultTodosFilter = TodosFilter.ACTIVE;

export const findTodoFilter = (value: Optional<string>): Optional<TodosFilter> => {
  return Object.values(TodosFilter).find((filter) => filter === value);
};
