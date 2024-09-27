"use server";

import z from "zod";

import { todosRepository } from "@/modules/infrastructure/repositories/todosDBRepository";
import { webCache } from "@/web/webCache";

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
  await todosRepository.delete(todo.todoId);
  webCache.revalidatePath(`users/${todo.userId}`);
};
