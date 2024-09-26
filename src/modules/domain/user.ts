import { Todo } from "@/modules/domain/todo";

export type User = {
    id: string;
    name: string;
    todos: Todo[];
}