"use server";

import z from "zod";

import { todosRepository } from "@/modules/infrastructure/repositories/todosDBRepository";

type Command = {
  userId: number;
  todoId: number;
  content: string;
};

const schema = z.object({
  userId: z.number().positive(),
  todoId: z.number().positive(),
  content: z.string(),
});

export const editTodo = async (command: Command) => {
  const todo = schema.parse(command);
  await todosRepository.update({
    id: todo.todoId,
    content: todo.content,
  });
};
