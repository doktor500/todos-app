"use server";

import z from "zod";

import { TodoId } from "@/modules/domain/todo";
import { UserId } from "@/modules/domain/user";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

type Command = {
  userId: UserId;
  todoId: TodoId;
  content: string;
};

const editTodoSchema = z.object({
  userId: z.number().positive(),
  todoId: z.string().min(1),
  content: z.string().min(1),
});

export const editTodo = async (command: Command) => {
  const todo = editTodoSchema.parse(command);
  await usersRepository.updateTodo(todo.userId, { id: todo.todoId, content: todo.content });
  webCache.revalidatePath(`users/${todo.userId}`);
};
