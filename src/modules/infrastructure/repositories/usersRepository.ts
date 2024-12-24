import { and, eq, inArray, SQL, sql } from "drizzle-orm";

import { TodosTable, UsersTable } from "@/datastore/schema";
import UsersRepository from "@/modules/application/repositories/usersRepository";
import { ExistingTodo, TodoEntry, TodoId } from "@/modules/domain/todo";
import { User, UserId } from "@/modules/domain/user";
import { Optional } from "@/modules/domain/utils/optionalUtils";
import { db } from "@/modules/infrastructure/repositories/db";

export const usersRepository: UsersRepository = {
  get: async (userId: UserId): Promise<Optional<User>> => {
    return db.query.UsersTable.findFirst({
      columns: { id: true, username: true, email: true },
      with: {
        todos: {
          columns: { id: true, content: true, completed: true, index: true },
          orderBy: (todo, { desc }) => [desc(todo.index)],
        },
      },
      where: (user) => eq(user.id, userId),
    });
  },
  getUserIdBy: async (query: { email: string; hashedPassword: string }): Promise<Optional<UserId>> => {
    return db.query.UsersTable.findFirst({
      columns: { id: true },
      where: (user) => and(eq(user.email, query.email), eq(user.password, query.hashedPassword)),
    }).then((data) => data?.id);
  },
  createUser: async (user: { username: string; email: string; hashedPassword: string }) => {
    const users = await db
      .insert(UsersTable)
      .values({ username: user.username, email: user.email, password: user.hashedPassword })
      .returning({ id: UsersTable.id });

    return users[0].id;
  },
  saveTodo: async (props: { userId: UserId; todoId: TodoId; content: string; index: number }): Promise<void> => {
    const { userId, todoId, content, index } = props;
    await db.insert(TodosTable).values({ userId, id: todoId, content, index });
  },
  updateTodo: async ({ userId, todo }: { userId: UserId; todo: ExistingTodo }): Promise<void> => {
    await db
      .update(TodosTable)
      .set(todo)
      .where(and(eq(TodosTable.userId, userId), eq(TodosTable.id, todo.id)));
  },
  deleteTodo: async ({ userId, todoId }: { userId: UserId; todoId: TodoId }): Promise<void> => {
    await db.delete(TodosTable).where(and(eq(TodosTable.userId, userId), eq(TodosTable.id, todoId)));
  },
  sortTodos: async ({ userId, todos }: { userId: UserId; todos: TodoEntry[] }): Promise<void> => {
    const query = getSortTodosQuery(todos);

    await db
      .update(TodosTable)
      .set({ index: query.setIndexStatement })
      .where(and(eq(TodosTable.userId, userId), inArray(TodosTable.id, query.ids)));
  },
};

const getSortTodosQuery = (todos: ExistingTodo[]) => {
  const initialValue: { ids: TodoId[]; chunks: SQL[] } = { ids: [], chunks: [] };
  const toChunk = (todo: ExistingTodo) => sql`when id = ${todo.id} then cast(${todo.index} as int)`;

  const query = todos.reduce(
    (result, todo) => ({ ids: [...result.ids, todo.id], chunks: [...result.chunks, toChunk(todo)] }),
    initialValue
  );

  return { setIndexStatement: sql.join([sql`(case`, ...query.chunks, sql`end)`], sql.raw(" ")), ids: query.ids };
};
