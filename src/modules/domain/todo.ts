import { TodosFilter } from "@/modules/domain/todosFilter";
import { isInfinite } from "@/modules/domain/utils/numberUtils";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";

export type TodoId = string;

export type Todo = {
  id: TodoId;
  content: string;
  completed: boolean;
  index: number;
};

export type ExistingTodo = Pick<Todo, "id"> & Partial<Todo>;
export type TodoEntry = { id: TodoId; index: number };

export const toggle = (todo: Todo): Todo => {
  return { ...todo, completed: !todo.completed };
};

export const filterTodos = (todos: Todo[]) => {
  return {
    by: ({ searchTerm, todosFilter }: { searchTerm: Optional<string>; todosFilter: TodosFilter }): Todo[] => {
      const filteredTodosBySearchTerm = filter(todos).bySearchTerm(searchTerm);

      return filter(filteredTodosBySearchTerm).byTodosFilter(todosFilter);
    },
  };
};

export const getNextTodoIndex = (todos: Todo[]) => {
  const index = Math.max(...todos.map((todo) => todo.index)) + 1;

  return isInfinite(index) ? 0 : index;
};

export const toTodoEntry = (todo: Todo) => ({ id: todo.id, index: todo.index });

const filter = (todos: Todo[]) => {
  return {
    byTodosFilter: (todosFilter: TodosFilter) => {
      return match(todosFilter)
        .with(TodosFilter.ACTIVE, () => todos.filter((todo) => !todo.completed))
        .with(TodosFilter.COMPLETED, () => todos.filter((todo) => todo.completed))
        .with(TodosFilter.NONE, () => todos)
        .exhaustive();
    },
    bySearchTerm: (term: Optional<string>) => {
      return term ? todos.filter((todo) => todo.content.toLowerCase().includes(term.toLowerCase())) : todos;
    },
  };
};
