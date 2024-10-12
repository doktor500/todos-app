import { Todo } from "@/modules/domain/todo";
import { randomDataGenerator } from "@/test/fixtures/utils/randomDataGenerator";

export const aTodo = (todo?: Partial<Todo>): Todo => {
  return {
    todoId: randomDataGenerator.anId(),
    content: randomDataGenerator.aString(),
    completed: false,
    createdAt: new Date(),
    ...todo,
  };
};
