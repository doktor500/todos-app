import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodoList } from "@/components/TodoList";
import { TodosSearchBar } from "@/components/TodosSearchBar";
import { TodosSpinner } from "@/components/TodosSpinner";

export const Todos = () => {
  return (
    <div className="flex justify-center">
      <div className="md:w-[600px]">
        <TodosSearchBar />
        <CreateTodoForm />
        <TodoList />
        <TodosSpinner />
      </div>
    </div>
  );
};
