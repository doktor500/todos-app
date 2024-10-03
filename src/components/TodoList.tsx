"use client";

import { TodoEntry } from "@/components/TodoEntry";
import { Todo } from "@/modules/domain/todo";

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="no-scrollbar max-h-[432px] overflow-y-auto pb-1 md:max-h-[484px]">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="pt-1">
            <TodoEntry todoId={todo.id} content={todo.content} completed={todo.completed} />
          </li>
        ))}
      </ul>
    </div>
  );
};
