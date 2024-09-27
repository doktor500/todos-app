import { TodosTable, UsersTable } from "@/drizzle/schema";
import { User } from "@/modules/domain/user";
import { db } from "@/modules/infrastructure/db";
import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";

export const usersTestRepository = {
  ...usersRepository,
  deleteAll: async () => {
    return db.delete(UsersTable);
  },
  save: async (user: User) => {
    await db
      .insert(UsersTable)
      .values({ id: user.id, name: user.name })
      .returning({ id: UsersTable.id });

    await Promise.all(
      user.todos.map((todo) => {
        return db.insert(TodosTable).values({ ...todo, userId: user.id });
      }),
    );
  },
};
