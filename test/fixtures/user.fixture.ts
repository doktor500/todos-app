import { User } from "@/modules/domain/user";
import { omit } from "@/modules/domain/utils/objectUtils";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { randomDataGenerator } from "@/test/fixtures/utils/randomDataGenerator";

export const aUser = <T extends Partial<User>>(user?: T): User & T => {
  return {
    id: randomDataGenerator.aNumber(),
    username: randomDataGenerator.aUsername(),
    email: randomDataGenerator.anEmail(),
    todos: [aTodo()],
    ...user,
  } as User & T;
};

export const userWithoutPassword = <T extends Partial<User & { password: string }>>(user: T): Omit<T, "password"> => {
  return omit(["password"], user);
};
