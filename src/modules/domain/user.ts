import { Todo } from "@/modules/domain/todo";

export type User = {
    id: number;
    name: string;
    todos: Todo[];
};