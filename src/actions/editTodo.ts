"use server";

import z from "zod";

import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

type Command = {
  userId: number;
  todoId: number;
  content: string;
};

const schema = z.object({
  userId: z.number().positive(),
  todoId: z.number().positive(),
  content: z.string(),
});

export const editTodo = async (command: Command) => {
  const todo = schema.parse(command);
  await usersRepository.updateTodo(todo.userId, { id: todo.todoId, content: todo.content });
  webCache.revalidatePath(`users/${todo.userId}`);
};
