import { and, eq } from "drizzle-orm";

import { TodosTable } from "@/datastore/schema";
import UsersRepository, { ExistingTodo } from "@/modules/application/repositories/usersRepository";
import { TodoId } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { db } from "@/modules/infrastructure/repositories/db";

export const usersRepository: UsersRepository = {
  get: async (userId: UserId): Promise<Optional<User>> => {
    return db.query.UsersTable.findFirst({
      columns: { id: true, name: true },
      with: {
        todos: {
          columns: { id: true, content: true, completed: true, createdAt: true },
          orderBy: (todo, { desc }) => [desc(todo.createdAt)],
        },
      },
      where: (user) => eq(user.id, userId),
    });
  },
  saveTodo: async (userId: UserId, content: string): Promise<void> => {
    await db.insert(TodosTable).values({ userId, content });
  },
  updateTodo: async (userId: UserId, todo: ExistingTodo): Promise<void> => {
    await db
      .update(TodosTable)
      .set(todo)
      .where(and(eq(TodosTable.userId, userId), eq(TodosTable.id, todo.id)));
  },
  deleteTodo: async (userId: UserId, todoId: TodoId): Promise<void> => {
    await db.delete(TodosTable).where(and(eq(TodosTable.userId, userId), eq(TodosTable.id, todoId)));
  },
};
