import { TodosFilter } from "@/modules/domain/todosFilter";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { match } from "@/modules/domain/utils/patternMatchingUtils";

export type TodoId = string;

export type Todo = {
  id: TodoId;
  content: string;
  completed: boolean;
  createdAt: Date;
};

export type ExistingTodo = Partial<Todo> & { id: TodoId };

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
