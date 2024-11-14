"use server";

import z from "zod";

import authService from "@/modules/domain/shared/authService";
import { MAX_LENGTH } from "@/modules/domain/utils/stringUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { Route } from "@/router/appRouter";

const createTodoSchema = z.object({ content: z.string().min(1).max(MAX_LENGTH) });

const { TODOS } = Route;

export const createTodo = async (formData: FormData) => {
  const session = await authService.verifySession();
  const data = createTodoSchema.parse({ userId: Number(formData.get("userId")), content: formData.get("content") });
  await usersRepository.saveTodo({ userId: session.userId, content: data.content });
  webCache.revalidatePath(TODOS);
};
