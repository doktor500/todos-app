"use server";

import z from "zod";

import authService from "@/modules/domain/shared/authService";
import { TodoId } from "@/modules/domain/todo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

type Command = {
  todoId: TodoId;
};

const deleteTodoSchema = z.object({ todoId: z.string().min(1) });

export const deleteTodo = async (command: Command) => {
  const session = await authService.verifySession();
  const todo = deleteTodoSchema.parse(command);
  await usersRepository.deleteTodo({ userId: session.userId, todoId: todo.todoId });
  webCache.revalidatePath(`users/${session.userId}`);
};
