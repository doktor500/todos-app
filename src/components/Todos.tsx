import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodoList } from "@/components/TodoList";
import { TodosAppHeader } from "@/components/TodosAppHeader";
import { TodosSearchBar } from "@/components/TodosSearchBar";

export const Todos = () => {
  return (
    <div className="container mx-auto max-w-2xl items-center justify-center px-4 pb-10">
      <div className="sticky top-0 z-50 bg-slate-900 pb-6 shadow-md">
        <TodosAppHeader />
        <TodosSearchBar />
        <CreateTodoForm />
      </div>
      <TodoList />
    </div>
  );
};
