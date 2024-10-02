"use server";

import z from "zod";

import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

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
  await usersRepository.updateTodo(todo.userId, { id: todo.todoId, completed: todo.completed });
  webCache.revalidatePath(`users/${todo.userId}`);
};
