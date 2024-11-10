import { and, eq } from "drizzle-orm";

import { TodosTable, UsersTable } from "@/datastore/schema";
import UsersRepository, { ExistingTodo } from "@/modules/application/repositories/usersRepository";
import { TodoId } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { db } from "@/modules/infrastructure/repositories/db";

export const usersRepository: UsersRepository = {
  get: async (userId: UserId): Promise<Optional<User>> => {
    return db.query.UsersTable.findFirst({
      columns: { id: true, username: true, email: true },
      with: {
        todos: {
          columns: { id: true, content: true, completed: true, createdAt: true },
          orderBy: (todo, { desc }) => [desc(todo.createdAt)],
        },
      },
      where: (user) => eq(user.id, userId),
    });
  },
  getUserIdBy: async (query: { email: string; hashedPassword: string }): Promise<Optional<UserId>> => {
    return db.query.UsersTable.findFirst({
      columns: { id: true },
      where: (user) => and(eq(user.email, query.email), eq(user.password, query.hashedPassword)),
    }).then((data) => data?.id);
  },
  createUser: async (user: { username: string; email: string; hashedPassword: string }) => {
    const users = await db
      .insert(UsersTable)
      .values({ username: user.username, email: user.email, password: user.hashedPassword })
      .returning({ id: UsersTable.id });

    return users[0].id;
  },
  saveTodo: async ({ userId, content }: { userId: UserId; content: string }): Promise<void> => {
    await db.insert(TodosTable).values({ userId, content });
  },
  updateTodo: async ({ userId, todo }: { userId: UserId; todo: ExistingTodo }): Promise<void> => {
    await db
      .update(TodosTable)
      .set(todo)
      .where(and(eq(TodosTable.userId, userId), eq(TodosTable.id, todo.id)));
  },
  deleteTodo: async ({ userId, todoId }: { userId: UserId; todoId: TodoId }): Promise<void> => {
    await db.delete(TodosTable).where(and(eq(TodosTable.userId, userId), eq(TodosTable.id, todoId)));
  },
};
