"use client";

import { PlusIcon } from "lucide-react";

import { createTodo } from "@/actions/todos/createTodo";
import { CreateTodoInput } from "@/components/core/todos/createTodoInput";
import { useForm } from "@/hooks/common/useForm";
import { useIsServer } from "@/hooks/common/useIsServer";
import { useTodos } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";
import uniqueIdGenerator from "@/modules/domain/shared/uniqueIdGenerator";
import { getNextTodoIndex } from "@/modules/domain/todo";
import { TodosFilter } from "@/modules/domain/todosFilter";
import { TodoOptimisticActionType } from "@/reducers/todoOptimisticActionReducer";

const { CREATE_TODO } = TodoOptimisticActionType;

export const CreateTodoForm = () => {
  const isServer = useIsServer();
  const { dispatchAction, todosFilter, allTodos } = useTodos();
  const { formRef, resetForm } = useForm();
  const display = todosFilter !== TodosFilter.COMPLETED;

  const handleCreateTodo = async (formData: FormData) => {
    const content = formData.get("content")?.toString();
    const todoId = uniqueIdGenerator.uuid();
    const sameStaleTodoExists = allTodos.some((todo) => todo.content === content && todo.stale);
    if (content && !sameStaleTodoExists) {
      resetForm();
      dispatchAction({ type: CREATE_TODO, payload: { todoId, content } });
      formData.set("index", getNextTodoIndex(allTodos).toString());
      formData.set("todoId", todoId);
      await createTodo(formData);
    }
  };

  return (
    display && (
      <div
        className={cn(
          "flex items-center dark:text-white h-11 rounded-lg pl-5 dark:bg-slate-900 dark:hover:bg-slate-800 border dark:border-gray-600",
          {
            "opacity-50": isServer,
          }
        )}
      >
        <PlusIcon className={cn("size-5", { "cursor-wait": isServer })} />
        <form ref={formRef} action={handleCreateTodo} aria-label="Create todo" className="w-full pr-6">
          <CreateTodoInput disabled={isServer} />
        </form>
      </div>
    )
  );
};
