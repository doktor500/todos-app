import "dotenv/config";

import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { MAX_LENGTH } from "@/modules/domain/utils/stringUtils";

export const UsersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: MAX_LENGTH }).notNull().unique(),
    email: varchar("email", { length: MAX_LENGTH }).notNull().unique(),
    password: varchar("password", { length: MAX_LENGTH }).notNull(),
  },
  (table) => {
    return {
      usernameIdx: index("usernameIndex").on(table.username),
    };
  }
);

export const TodosTable = pgTable("todos", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: varchar("content", { length: MAX_LENGTH }).notNull(),
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
