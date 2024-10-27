"use server";

import z from "zod";

import { verifySession } from "@/authentication";
import { TodoId } from "@/modules/domain/todo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

type Command = {
  todoId: TodoId;
  completed: boolean;
};

const toggleTodoSchema = z.object({ todoId: z.string().min(1), completed: z.boolean() });

export const toggleTodo = async (command: Command) => {
  const session = await verifySession();
  const todo = toggleTodoSchema.parse(command);
  await usersRepository.updateTodo(session.userId, { id: todo.todoId, completed: todo.completed });
  webCache.revalidatePath(`users/${session.userId}`);
};
