import { eq } from "drizzle-orm";

import { TodosTable } from "@/drizzle/schema";
import UsersRepository from "@/modules/application/repositories/usersRepository";
import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optional";
import { db } from "@/modules/infrastructure/db";

export const usersRepository: UsersRepository = {
  findById: async (userId: number): Promise<Optional<User>> => {
    return db.query.UsersTable.findFirst({
      columns: { id: true, name: true },
      with: { todos: { columns: { id: true, content: true } } },
      where: (user) => eq(user.id, userId),
    });
  },
  saveTodo: async (userId: number, todo: string): Promise<void> => {
    await db.insert(TodosTable).values({ userId, content: todo });
  },
};
