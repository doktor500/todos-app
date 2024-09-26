import UsersRepository from "@/modules/application/repositories/usersRepository";
import { User } from "@/modules/domain/user";
import { db } from "@/modules/infrastructure/db";
import { eq } from "drizzle-orm";

export const usersRepository: UsersRepository = {
    findById: async (id: number): Promise<User | undefined> => {
        const user = await db.query.UsersTable.findFirst({ 
            columns: { id: true, name: true },
            with: { todos: true },
            where: ((user) => eq(user.id, id))
        });
        
        return user && { ...user, todos: user.todos.map((todo) => ({ id: todo.id, content: todo.content })) };
    }
};