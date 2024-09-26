import { User } from "@/modules/domain/user";

interface UsersRepository {
    findById(id: number): Promise<User | undefined>;
};

export default UsersRepository;