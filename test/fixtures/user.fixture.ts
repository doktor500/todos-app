import { User, UserDTO } from "@/modules/domain/user";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { randomDataGenerator } from "@/test/fixtures/utils/randomDataGenerator";

export const aUser = (user?: Partial<User>): User => {
  return {
    id: randomDataGenerator.aNumber(),
    username: randomDataGenerator.aString(),
    email: randomDataGenerator.anEmail(),
    password: randomDataGenerator.aPassword(),
    todos: [aTodo()],
    ...user,
  };
};

export const aUserDto = (user?: Partial<UserDTO>): UserDTO => {
  return {
    id: user?.id ?? randomDataGenerator.aNumber(),
    username: user?.username ?? randomDataGenerator.aString(),
    email: user?.email ?? randomDataGenerator.anEmail(),
    todos: user?.todos ?? [aTodo()],
  };
};
