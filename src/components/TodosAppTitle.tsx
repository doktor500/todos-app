import { TodosAppLogo } from "@/components/TodosLogo";
import { TodosSpinner } from "@/components/TodosSpinner";

export const TodosAppTitlte = () => {
  return (
    <div className="flex items-center justify-center pt-4">
      <div className="h-8">
        <TodosSpinner />
        <TodosAppLogo />
      </div>
      <h1 className="bg-gradient-to-r from-custom-primary to-custom-secondary bg-clip-text pl-4 pt-2 text-center font-sans text-2xl font-bold text-transparent">
        Inbox
      </h1>
    </div>
  );
};
