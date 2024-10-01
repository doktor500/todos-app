"use client";

import { useState } from "react";

import { CreateTodoForm } from "@/components/CreateTodoForm";
import { TodoList } from "@/components/TodoList";
import { SearchInput } from "@/components/ui/SearchInput";
import { Spinner } from "@/components/ui/Spinner";
import { useTodos } from "@/hooks/useTodos";
import { Todo } from "@/modules/domain/todo";
import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";

export const Todos = ({ user }: { user: User }) => {
  const { todos, todoActionHandler, pendingTransaction } = useTodos(user.todos);
  const [searchTerm, setSearchTerm] = useState<Optional<string>>(undefined);

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <SearchInput onChange={setSearchTerm} />
      <Spinner display={pendingTransaction} />
      <CreateTodoForm userId={user.id} todoActionHandler={todoActionHandler} pendingTransaction={pendingTransaction} />
      <TodoList userId={user.id} todos={filter(todos).by(searchTerm)} todoActionHandler={todoActionHandler} />
    </div>
  );
};

const filter = (todos: Todo[]) => {
  return {
    by: (searchTerm: Optional<string>): Todo[] => {
      return searchTerm ? todos.filter((todo) => todo.content.toLowerCase().includes(searchTerm.toLowerCase())) : todos;
    },
  };
};
