import { User } from "@/modules/domain/user";
import { aTodo } from "@/test/fixtures/todo.fixture";
import { randomDataGenerator } from "@/test/fixtures/utils/randomDataGenerator";

export const aUser = (user?: Partial<User>): User => {
  return {
    id: randomDataGenerator.aNumber(),
    name: randomDataGenerator.aString(),
    todos: [aTodo()],
    ...user,
  };
};
