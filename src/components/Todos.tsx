import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodoList } from "@/components/TodoList";
import { TodosSearchBar } from "@/components/TodosSearchBar";
import { TodosSpinner } from "@/components/ui/TodosSpinner";

export const Todos = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <TodosSearchBar />
      <CreateTodoForm />
      <TodoList />
      <TodosSpinner />
    </div>
  );
};
