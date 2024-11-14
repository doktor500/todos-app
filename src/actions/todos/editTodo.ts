"use server";

import z from "zod";

import authService from "@/modules/domain/shared/authService";
import { TodoId } from "@/modules/domain/todo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { Route } from "@/router/appRouter";

type Command = {
  todoId: TodoId;
  content: string;
};

const editTodoSchema = z.object({ todoId: z.string().min(1), content: z.string().min(1) });

const { TODOS } = Route;

export const editTodo = async (command: Command) => {
  const session = await authService.verifySession();
  const todo = editTodoSchema.parse(command);
  await usersRepository.updateTodo({ userId: session.userId, todo: { id: todo.todoId, content: todo.content } });
  webCache.revalidatePath(TODOS);
};
