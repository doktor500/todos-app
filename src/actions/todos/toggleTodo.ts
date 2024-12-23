"use server";

import z from "zod";

import authService from "@/modules/domain/shared/authService";
import { TodoId } from "@/modules/domain/todo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { Route } from "@/router/appRouter";

type Command = {
  todoId: TodoId;
  completed: boolean;
};

const { TODOS } = Route;

const toggleTodoSchema = z.object({ todoId: z.string().uuid(), completed: z.boolean() });

export const toggleTodo = async (command: Command) => {
  const session = await authService.verifySession();
  const todo = toggleTodoSchema.parse(command);
  await usersRepository.updateTodo({ userId: session.userId, todo: { id: todo.todoId, completed: todo.completed } });
  webCache.revalidatePath(TODOS);
};
