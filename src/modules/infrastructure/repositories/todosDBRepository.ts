import { eq } from "drizzle-orm";

import { TodosTable } from "@/datastore/schema";
import TodosRepository from "@/modules/application/repositories/todosRepository";
import { ExistingTodo } from "@/modules/domain/todo";
import { db } from "@/modules/infrastructure/repositories/db";

export const todosRepository: TodosRepository = {
  async update(todo: ExistingTodo): Promise<void> {
    await db.update(TodosTable).set(todo).where(eq(TodosTable.id, todo.id));
  },
  async delete(todoId: number): Promise<void> {
    await db.delete(TodosTable).where(eq(TodosTable.id, todoId));
  },
};
