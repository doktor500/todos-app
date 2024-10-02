import { TodosTable, UsersTable } from "@/datastore/schema";
import { usersRepository as usersFakeRepository } from "@/fakes/modules/infrastructure/repositories/usersRepository";
import { User } from "@/modules/domain/user";
import { db } from "@/modules/infrastructure/repositories/db";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";

export const usersTestRepository = {
  ...usersRepository,
  deleteAll: async () => {
    return db.delete(UsersTable);
  },
  save: async (user: User) => {
    await db.insert(UsersTable).values({ id: user.id, name: user.name }).returning({ id: UsersTable.id });

    await Promise.all(
      user.todos.map((todo) => {
        return db.insert(TodosTable).values({ ...todo, userId: user.id });
      })
    );
  },
};

export const getUsersRepository = () => {
  return process.env.ENVIRONMENT === "local" ? usersFakeRepository : usersTestRepository;
};
