import { Optional } from "@/modules/domain/utils/optionalUtils";

export const TodosFilter = {
  NONE: "NONE",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
} as const;

export type TodosFilter = (typeof TodosFilter)[keyof typeof TodosFilter];

export const defaultTodosFilter = TodosFilter.ACTIVE;

export const findTodoFilter = (value: Optional<string>): Optional<TodosFilter> => {
  return Object.values(TodosFilter).find((filter) => filter === value);
};
