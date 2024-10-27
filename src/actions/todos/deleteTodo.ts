"use server";

import z from "zod";

import { verifySession } from "@/authentication";
import { TodoId } from "@/modules/domain/todo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

type Command = {
  todoId: TodoId;
};

const deleteTodoSchema = z.object({ todoId: z.string().min(1) });

export const deleteTodo = async (command: Command) => {
  const session = await verifySession();
  const todo = deleteTodoSchema.parse(command);
  await usersRepository.deleteTodo(session.userId, todo.todoId);
  webCache.revalidatePath(`users/${session.userId}`);
};
