import { TodosAppTitle } from "@/components/TodosAppTitle";
import { TodosAppLogo } from "@/components/TodosLogo";
import { TodosSpinner } from "@/components/TodosSpinner";

export const TodosAppHeader = () => {
  return (
    <div className="flex items-center justify-center pt-4">
      <div className="h-8">
        <TodosSpinner />
        <TodosAppLogo />
      </div>
      <TodosAppTitle />
    </div>
  );
};
