"use client";

import { AppHeader } from "@/components/core/app/appHeader";
import { CreateTodoForm } from "@/components/core/todos/createTodoForm";
import { TodoList } from "@/components/core/todos/todoList";
import { TodosSearchBar } from "@/components/core/todos/todosSearchBar";
import { usePWAReload } from "@/hooks/common/usePWAReload";
import { useTodos } from "@/hooks/useTodos";

export const Todos = () => {
  const { pendingTransaction } = useTodos();
  usePWAReload();

  return (
    <>
      <AppHeader title="Inbox" isPending={pendingTransaction} showAccountMenu={true} />
      <TodosSearchBar />
      <CreateTodoForm />
      <TodoList />
    </>
  );
};
