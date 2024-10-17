"use server";

import z from "zod";

import { TodoId } from "@/modules/domain/todo";
import { UserId } from "@/modules/domain/user";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

type Command = {
  userId: UserId;
  todoId: TodoId;
  completed: boolean;
};

const schema = z.object({
  userId: z.number().positive(),
  todoId: z.string().min(1),
  completed: z.boolean(),
});

export const toggleTodo = async (command: Command) => {
  const todo = schema.parse(command);
  await usersRepository.updateTodo(todo.userId, { id: todo.todoId, completed: todo.completed });
  webCache.revalidatePath(`users/${todo.userId}`);
};
