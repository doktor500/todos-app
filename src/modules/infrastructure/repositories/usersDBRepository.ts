import { eq } from "drizzle-orm";

import UsersRepository from "@/modules/application/repositories/usersRepository";
import { User } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optional";
import { db } from "@/modules/infrastructure/db";

export const usersRepository: UsersRepository = {
  findById: async (id: number): Promise<Optional<User>> => {
    return db.query.UsersTable.findFirst({
      columns: { id: true, name: true },
      with: { todos: { columns: { id: true, content: true } } },
      where: (user) => eq(user.id, id),
    });
  },
};
