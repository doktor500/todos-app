"use server";

import z from "zod";

import { verifySession } from "@/authentication";
import { TodoId } from "@/modules/domain/todo";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

type Command = {
  todoId: TodoId;
  content: string;
};

const editTodoSchema = z.object({ todoId: z.string().min(1), content: z.string().min(1) });

export const editTodo = async (command: Command) => {
  const session = await verifySession();
  const todo = editTodoSchema.parse(command);
  await usersRepository.updateTodo(session.userId, { id: todo.todoId, content: todo.content });
  webCache.revalidatePath(`users/${session.userId}`);
};
