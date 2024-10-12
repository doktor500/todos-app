"use server";

import z from "zod";

import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

const schema = z.object({
  userId: z.number().positive(),
  content: z.string().min(1).max(255),
});

export const createTodo = async (formData: FormData) => {
  const data = schema.parse({
    userId: Number(formData.get("userId")),
    content: formData.get("content"),
  });

  await usersRepository.saveTodo(data.userId, data.content);
  webCache.revalidatePath(`users/${data.userId}`);
};
