import z from "zod";

import { usersRepository } from "@/modules/infrastructure/repositories/usersDBRepository";
import { webCache } from "@/web/webCache";

const schema = z.object({
  userId: z.number().positive(),
  todo: z.string().min(1).max(80),
});

export const createTodo = async (formData: FormData) => {
  "use server";

  const data = schema.parse({
    userId: Number(formData.get("userId")),
    todo: formData.get("todo"),
  });

  await usersRepository.saveTodo(data.userId, data.todo);
  webCache.revalidatePath(`users/${data.userId}`);
};
