import { TodosAppTitle } from "@/components/core/todos/TodosAppTitle";
import { TodosAppLogo } from "@/components/core/todos/TodosLogo";
import { TodosSpinner } from "@/components/core/todos/TodosSpinner";

export const TodosAppHeader = () => {
  return (
    <div className="flex items-center justify-center pb-6 pt-4">
      <div className="h-8">
        <TodosSpinner />
        <TodosAppLogo />
      </div>
      <TodosAppTitle />
    </div>
  );
};
