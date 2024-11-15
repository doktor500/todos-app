"use server";

import z from "zod";

import authService from "@/modules/domain/shared/authService";
import { MAX_LENGTH } from "@/modules/domain/utils/stringUtils";
import { usersRepository } from "@/modules/infrastructure/repositories/usersRepository";
import { webCache } from "@/modules/infrastructure/web/webCache";
import { Route } from "@/router/appRouter";

const { TODOS } = Route;

const createTodoSchema = z.object({ content: z.string().min(1).max(MAX_LENGTH), index: z.coerce.number() });

export const createTodo = async (formData: FormData) => {
  const session = await authService.verifySession();
  const data = createTodoSchema.parse({ content: formData.get("content"), index: formData.get("index") });

  await usersRepository.saveTodo({ userId: session.userId, content: data.content, index: data.index });
  webCache.revalidatePath(TODOS);
};
