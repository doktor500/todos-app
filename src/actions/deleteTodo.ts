"use server";

import z from "zod";

import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

type Command = {
  userId: number;
  todoId: number;
};

const schema = z.object({
  userId: z.number().positive(),
  todoId: z.number().positive(),
});

export const deleteTodo = async (command: Command) => {
  const todo = schema.parse(command);
  await usersRepository.deleteTodo(todo.userId, todo.todoId);
  webCache.revalidatePath(`users/${todo.userId}`);
};
