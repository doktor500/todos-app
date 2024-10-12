import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodoList } from "@/components/TodoList";
import { TodosSearchBar } from "@/components/TodosSearchBar";
import { TodosSpinner } from "@/components/TodosSpinner";

export const Todos = () => {
  return (
    <div className="flex justify-center pb-10">
      <div className="md:w-[600px]">
        <div className="sticky top-0 z-50 bg-slate-900 pb-6 shadow-md">
          <h1 className="pt-4 text-center text-2xl font-bold">Inbox</h1>
          <TodosSpinner />
          <TodosSearchBar />
          <CreateTodoForm />
        </div>
        <TodoList />
      </div>
    </div>
  );
};
