"use server";

import z from "zod";

import { TodoId } from "@/modules/domain/todo";
import { UserId } from "@/modules/domain/user";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

type Command = {
  userId: UserId;
  todoId: TodoId;
};

const deleteTodoSchema = z.object({
  userId: z.number().positive(),
  todoId: z.string().min(1),
});

export const deleteTodo = async (command: Command) => {
  const todo = deleteTodoSchema.parse(command);
  await usersRepository.deleteTodo(todo.userId, todo.todoId);
  webCache.revalidatePath(`users/${todo.userId}`);
};
