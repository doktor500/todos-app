"use server";

import z from "zod";

import authService from "@/modules/domain/shared/authService";
import { TodoEntry } from "@/modules/domain/todo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { Route } from "@/router/appRouter";

type Command = {
  todos: TodoEntry[];
};

const { TODOS } = Route;

const todoSchema = z.object({ id: z.string().uuid(), index: z.number().positive() });
const sortTodosSchema = z.object({ todos: z.array(todoSchema).min(1) });

export const sortTodos = async (command: Command) => {
  const session = await authService.verifySession();
  const { todos } = sortTodosSchema.parse(command);

  await usersRepository.sortTodos({ userId: session.userId, todos });
  webCache.revalidatePath(TODOS);
};
