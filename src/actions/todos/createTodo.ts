"use server";

import z from "zod";

import { verifySession } from "@/authentication";
import { MAX_LENGTH } from "@/modules/domain/utils/stringUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";

const createTodoSchema = z.object({ content: z.string().min(1).max(MAX_LENGTH) });

export const createTodo = async (formData: FormData) => {
  const session = await verifySession();
  const data = createTodoSchema.parse({ userId: Number(formData.get("userId")), content: formData.get("content") });
  await usersRepository.saveTodo(session.userId, data.content);
  webCache.revalidatePath(`users/${session.userId}`);
};
