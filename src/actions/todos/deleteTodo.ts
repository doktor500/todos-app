"use server";

import z from "zod";

import authService from "@/modules/domain/shared/authService";
import { TodoId } from "@/modules/domain/todo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { Route } from "@/router/appRouter";

type Command = {
  todoId: TodoId;
};

const { TODOS } = Route;

const deleteTodoSchema = z.object({ todoId: z.string().uuid() });

export const deleteTodo = async (command: Command) => {
  const session = await authService.verifySession();
  const todo = deleteTodoSchema.parse(command);
  await usersRepository.deleteTodo({ userId: session.userId, todoId: todo.todoId });
  webCache.revalidatePath(TODOS);
};
