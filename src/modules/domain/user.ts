import { Todo } from "@/modules/domain/todo";

export type UserId = number;

export type User = {
  id: UserId;
  username: string;
  email: string;
  todos: Todo[];
};
