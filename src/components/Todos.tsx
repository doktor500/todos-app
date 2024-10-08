"use client";

import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodoList } from "@/components/TodoList";
import { TodosSearchBar } from "@/components/TodosSearchBar";
import { Spinner } from "@/components/ui/Spinner";
import { useTodos } from "@/hooks/useTodos";

export const Todos = () => {
  const { pendingTransaction, dispatchAction, getTodos } = useTodos();

  return (
    <div className="flex flex-col items-center justify-center">
      <TodosSearchBar dispatchAction={dispatchAction} />
      <CreateTodoForm />
      <TodoList todos={getTodos()} />
      <Spinner display={pendingTransaction} />
    </div>
  );
};
