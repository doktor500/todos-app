"use server";

import z from "zod";

import { todosRepository } from "@/modules/infrastructure/repositories/todosDBRepository";
import { webCache } from "@/web/webCache";

type Command = {
  userId: number;
  todoId: number;
  completed: boolean;
};

const schema = z.object({
  userId: z.number().positive(),
  todoId: z.number().positive(),
  completed: z.boolean(),
});

export const toggleTodo = async (command: Command) => {
  const todo = schema.parse(command);
  await todosRepository.update({
    todoId: todo.todoId,
    completed: todo.completed,
  });
  webCache.revalidatePath(`users/${command.userId}`);
};
