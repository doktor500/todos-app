import { PlusIcon } from "lucide-react";

import { createTodo } from "@/actions/createTodo";

export const CreateTodoForm = ({ userId }: { userId: number }) => {
  return (
    <div className="h-11 w-96 rounded-sm bg-black/20 pl-4 pt-3 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/30">
      <div className="flex items-center text-gray-800 dark:text-white">
        <PlusIcon size="20" />
        <form action={createTodo} aria-label="Create todo">
          <input type="hidden" name="userId" value={userId} />
          <input
            type="text"
            name="todo"
            aria-label="New todo"
            placeholder="Add a to-do..."
            className="w-80 border-none bg-transparent pl-1 text-sm outline-none"
          />
        </form>
      </div>
    </div>
  );
};
