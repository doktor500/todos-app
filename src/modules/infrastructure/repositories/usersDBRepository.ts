import { eq } from "drizzle-orm";

import UsersRepository from "@/modules/application/repositories/usersRepository";
import { Todo } from "@/modules/domain/todo";
import { User } from "@/modules/domain/user";
import { db } from "@/modules/infrastructure/db";

export const usersRepository: UsersRepository = {
  findById: async (id: number): Promise<User | undefined> => {
    const user = await db.query.UsersTable.findFirst({
      columns: { id: true, name: true },
      with: { todos: true },
      where: (user) => eq(user.id, id),
    });

    return user && { ...user, todos: user.todos.map(toTodo) };
  },
};

const toTodo = <T extends Todo>(todo: T) => {
  return {
    id: todo.id,
    content: todo.content,
  };
};
