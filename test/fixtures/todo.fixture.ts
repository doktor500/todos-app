import { Todo } from "@/modules/domain/todo";
import { randomDataGenerator } from "@/test/fixtures/utils/randomDataGenerator";

export const aTodo = (todo?: Partial<Todo>): Todo => {
  return {
    id: randomDataGenerator.aNumber(),
    content: randomDataGenerator.aString(),
    completed: false,
    ...todo,
  };
};
