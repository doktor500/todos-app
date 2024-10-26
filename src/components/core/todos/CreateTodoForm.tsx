"use client";

import { PlusIcon } from "lucide-react";

import { createTodo } from "@/actions/todos/createTodo";
import { CreateTodoInput } from "@/components/core/todos/CreateTodoInput";
import { useForm } from "@/hooks/common/useForm";
import { useIsServer } from "@/hooks/common/useIsServer";
import { useTodos } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

const { CREATE_TODO } = TodoOptimisticActionType;

export const CreateTodoForm = () => {
  const isServer = useIsServer();
  const { userId, dispatchAction } = useTodos();
  const { formRef, resetForm } = useForm();

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
      className={cn("h-11 rounded-lg pl-6 pt-2 dark:bg-slate-900 dark:hover:bg-slate-800 border dark:border-gray-600", {
        "opacity-50": isServer,
      })}
    >
      <div className="flex items-center dark:text-white">
        <PlusIcon className={cn("size-5", { "cursor-wait": isServer })} />
        <form ref={formRef} action={handleCreateTodo} aria-label="Create todo" className="w-full pr-6">
          <input type="hidden" name="userId" value={userId} />
          <CreateTodoInput disabled={isServer} />
        </form>
      </div>
    </div>
  );
};
