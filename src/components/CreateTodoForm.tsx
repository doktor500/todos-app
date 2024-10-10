"use client";

import { PlusIcon } from "lucide-react";

import { createTodo } from "@/actions/createTodo";
import { CreateTodoInput } from "@/components/CreateTodoInput";
import { useForm } from "@/hooks/common/useForm";
import { useIsServer } from "@/hooks/common/useIsServer";
import { useTodos } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

const { CREATE_TODO } = TodoOptimisticActionType;

export const CreateTodoForm = () => {
  const isServer = useIsServer();
  const { userId, dispatchAction } = useTodos();
  const { formRef, pending, setPending, resetForm } = useForm();

  const handleCreateTodo = async (formData: FormData) => {
    const content = formData.get("content")?.toString();
    if (content) {
      dispatchAction({ type: CREATE_TODO, payload: { content } });
      resetForm();
      await createTodo(formData);
    }
  };

  return (
    <div
      className={cn(
        "h-11 w-80 rounded-sm bg-black/20 pl-4 pt-2.5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/30 md:w-96",
        pending ? "opacity-40" : "opacity-100"
      )}
    >
      <div className="flex items-center text-gray-800 dark:text-white">
        <PlusIcon className={cn("size-5", isServer ? "cursor-not-allowed" : "")} />
        <form ref={formRef} action={handleCreateTodo} aria-label="Create todo">
          <input type="hidden" name="userId" value={userId} />
          <CreateTodoInput onSubmit={setPending} />
        </form>
      </div>
    </div>
  );
};
