import { User } from "@/modules/domain/user";

export const usersRepository = {
    findById: async (id: string): Promise<User | null> => {
        //TODO Implement real repository
        return { id, name: "David", todos: [{ id: "1", content: "todo-1" }] };
    },
};