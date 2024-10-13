import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodoList } from "@/components/TodoList";
import { TodosAppTitlte } from "@/components/TodosAppTitle";
import { TodosSearchBar } from "@/components/TodosSearchBar";

export const Todos = () => {
  return (
    <div className="flex justify-center pb-10">
      <div className="md:w-[600px]">
        <div className="sticky top-0 z-50 pb-6 shadow-md">
          <TodosAppTitlte />
          <TodosSearchBar />
          <CreateTodoForm />
        </div>
        <TodoList />
      </div>
    </div>
  );
};
