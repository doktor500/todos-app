import { TodosTable, UsersTable } from "@/drizzle/schema";
import { User } from "@/modules/domain/user";
import { client, db } from "@/modules/infrastructure/db";
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
      user.todos.map(({ id, content }) => {
        return db.insert(TodosTable).values({ id, content, userId: user.id });
      }),
    );
  },
  end: async () => {
    return client.end();
  },
};
