import "dotenv/config";

import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const TodosTable = pgTable("todos", {
  todoId: uuid("todoId").defaultRandom().primaryKey(),
  content: varchar("content", { length: 255 }).notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  userId: integer("userId")
    .references(() => UsersTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const UsersTableRelations = relations(UsersTable, ({ many }) => {
  return { todos: many(TodosTable) };
});

export const TodosTableRelations = relations(TodosTable, ({ one }) => {
  return {
    user: one(UsersTable, {
      fields: [TodosTable.userId],
      references: [UsersTable.id],
    }),
  };
});
