"use client";

import { AppHeader } from "@/components/core/app/appHeader";
import { CreateTodoForm } from "@/components/core/todos/createTodoForm";
import { TodoList } from "@/components/core/todos/todoList";
import { TodosSearchBar } from "@/components/core/todos/todosSearchBar";
import { useTodos } from "@/hooks/useTodos";

export const Todos = () => {
  const { pendingTransaction } = useTodos();

  return (
    <div className="container mx-auto max-w-2xl items-center justify-center px-4 pb-10">
      <div className="sticky top-0 z-50 bg-slate-900 pb-6">
        <AppHeader title="Inbox" isPending={pendingTransaction} />
        <TodosSearchBar />
        <CreateTodoForm />
      </div>
      <TodoList />
    </div>
  );
};
