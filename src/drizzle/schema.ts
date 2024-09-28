import "dotenv/config";

import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const TodosTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  content: varchar("content", { length: 255 }).notNull(),
  completed: boolean("completed").default(false).notNull(),
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
