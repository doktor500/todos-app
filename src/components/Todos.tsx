import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodoList } from "@/components/TodoList";
import { TodosSearchBar } from "@/components/TodosSearchBar";
import { TodosSpinner } from "@/components/TodosSpinner";

export const Todos = () => {
  return (
    <div className="flex justify-center pb-10">
      <div className="md:w-[600px]">
        <TodosSpinner />
        <TodosSearchBar />
        <CreateTodoForm />
        <TodoList />
      </div>
    </div>
  );
};
