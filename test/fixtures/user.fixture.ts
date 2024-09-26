import { randomDataGenerator } from "@/test/utils/randomDataGenerator";
import { User } from "@/modules/domain/user";
import { aTodo } from "@/test/fixtures/todo.fixture";

export const aUser = (user?: Partial<User>): User => {
    return {
        id: randomDataGenerator.anId(),
        name: randomDataGenerator.aString(),
        todos: [aTodo()],
        ...user
    }
}