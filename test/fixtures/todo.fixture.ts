import { Todo } from "@/modules/domain/todo";
import { randomDataGenerator } from "@/test/utils/randomDataGenerator";

export const aTodo = (todo?: Partial<Todo>): Todo => {
    return {
        id: randomDataGenerator.anId(),
        content: randomDataGenerator.aString(),
        ...todo
    }
}