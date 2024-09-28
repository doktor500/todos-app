import { eq } from "drizzle-orm";

import { TodosTable } from "@/drizzle/schema";
import TodosRepository, { UpdateTodo } from "@/modules/application/repositories/todosRepository";
import { db } from "@/modules/infrastructure/db";

export const todosRepository: TodosRepository = {
  async update({ todoId, completed }: UpdateTodo): Promise<void> {
    await db.update(TodosTable).set({ completed }).where(eq(TodosTable.id, todoId));
  },
  async delete(todoId: number): Promise<void> {
    await db.delete(TodosTable).where(eq(TodosTable.id, todoId));
  },
};
