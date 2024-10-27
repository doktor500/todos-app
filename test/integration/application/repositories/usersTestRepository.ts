import { TodosTable, UsersTable } from "@/datastore/schema";
import { User } from "@/modules/domain/user";
import { db } from "@/modules/infrastructure/repositories/db";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const usersTestRepository = {
  ...usersRepository,
  deleteAll: async () => {
    return db.delete(UsersTable);
  },
  save: async (user: User & { password: string }) => {
    await db.insert(UsersTable).values(user);

    await Promise.all(
      user.todos.map((todo) => {
        return db.insert(TodosTable).values({ ...todo, userId: user.id });
      })
    );
  },
};
