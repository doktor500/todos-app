"use client";

import { useTodos } from "@/hooks/useTodos";
import { AppHeader } from "@/react-components/core/app/appHeader";
import { CreateTodoForm } from "@/react-components/core/todos/createTodoForm";
import { TodoList } from "@/react-components/core/todos/todoList";
import { TodosSearchBar } from "@/react-components/core/todos/todosSearchBar";

export const Todos = () => {
  const { pendingTransaction } = useTodos();

  return (
    <div className="container mx-auto max-w-2xl items-center justify-center px-4 pb-10">
      <div className="sticky top-0 z-50 bg-slate-900 pb-6">
        <AppHeader title="Inbox" isPending={pendingTransaction} showAccountMenu={true} />
        <div className="pt-8">
          <TodosSearchBar />
          <CreateTodoForm />
        </div>
      </div>
      <TodoList />
    </div>
  );
};
