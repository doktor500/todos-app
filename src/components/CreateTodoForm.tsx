"use client";

import { PlusIcon } from "lucide-react";

import { createTodo } from "@/actions/createTodo";
import { useForm } from "@/hooks/common/useForm";
import { useTodos } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

const { CREATE_TODO } = TodoOptimisticActionType;

export const CreateTodoForm = () => {
  const { userId, dispatchAction, pendingTransaction } = useTodos();
  const { formRef, resetForm } = useForm();

  const handleCreateTodo = async (formData: FormData) => {
    const content = formData.get("content")?.toString();
    if (content && !pendingTransaction) {
      dispatchAction({ type: CREATE_TODO, payload: { content } });
      resetForm();

      await createTodo(formData);
    }
  };

  const opacity = pendingTransaction ? "opacity-40" : "opacity-100";

  return (
    <div
      className={cn(
        "h-11 w-80 rounded-sm bg-black/20 pl-4 pt-2.5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/30 md:w-96",
        opacity
      )}
    >
      <div className="flex items-center text-gray-800 dark:text-white">
        <PlusIcon className="size-5" />
        <form ref={formRef} action={handleCreateTodo} aria-label="Create todo">
          <input type="hidden" name="userId" value={userId} />
          <input
            type="text"
            name="content"
            aria-label="New todo"
            placeholder="Add a to-do..."
            className="w-64 border-none bg-transparent pl-1 text-sm outline-none md:w-80"
            disabled={pendingTransaction}
          />
        </form>
      </div>
    </div>
  );
};
